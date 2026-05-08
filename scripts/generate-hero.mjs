#!/usr/bin/env node
/**
 * gpt-image-2 で TOP ヒーロー画像を生成し public/hero.png に保存。
 *
 * 使い方:
 *   OPENAI_API_KEY=sk-... node scripts/generate-hero.mjs
 *
 * オプション:
 *   --variant=editorial|abstract|photo  バリエーション切替（デフォルト editorial）
 *   --size=1536x1024|1024x1024          画像サイズ（デフォルト 1536x1024）
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const variant = args.variant ?? "editorial";
const size = args.size ?? "1536x1024";
const out = path.join(ROOT, "public", args.out ?? "hero.png");

const PROMPTS = {
  /* === editorial === 上質な編集デザイン。書籍カバー風 + 知のネットワーク。 */
  editorial: `
A wide editorial hero image for a Japanese startup education platform called "起業の科学ポータル" (Startup Science Portal).
Style: refined, editorial, magazine-quality. Inspired by Japanese fintech/research publication aesthetics.
Composition: clean off-white paper background (#FAF8F5) on the left half (negative space for text overlay),
with a sophisticated illustration on the right side: an abstract knowledge graph — a triangular constellation of three
glowing nodes connected by thin elegant lines, suggesting "ideas, validation, market" interconnected.
The top node is muted plum purple (#8D4086), the bottom two are deep charcoal black (#1A1A1A).
Subtle hand-drawn pencil sketches of business concepts (graphs, customer journey arcs, light bulb)
fade into the background as ghosted layers.
A few thin horizontal rule lines and small Japanese kanji glyphs (起業 / 検証 / PMF) appear as faint editorial annotations,
in light gray, treated as design elements not focal text.
Lighting: soft directional natural light from upper-left, casting subtle shadows.
Color palette: warm off-white #FAF8F5 base, plum purple #8D4086 accent, charcoal #1A1A1A, neutral gray #767676.
No people. No stock photo cliché. No 3D rendering. Flat editorial design with handcrafted illustration feel.
High resolution, suitable as a website hero banner. Aspect ratio 3:2.
`.trim(),

  /* === abstract === 抽象幾何学。ネットワーク・成長グラフのモチーフ。 */
  abstract: `
A wide abstract geometric hero image for a Japanese startup science education platform.
Composition: warm off-white background (#FAF8F5). Abstract minimalist illustration:
- A sweeping ascending growth curve made of dotted lines (representing PMF achievement)
- A scattered constellation of small circles (data points) in plum purple (#8D4086) and charcoal black (#1A1A1A)
- The curve passes through key inflection points marked by larger filled circles
- In the lower right, three concentric rings suggesting concentric markets (TAM/SAM/SOM)
- Subtle thin Japanese vertical text "起業の科学" in faded ink as a design element on the far right edge
Style: editorial infographic, refined, restrained. Like a high-end New York Times graphics piece.
Lighting: even soft lighting, no shadows, flat design.
Color palette: warm off-white #FAF8F5 base, plum purple #8D4086 (60% saturation), charcoal #1A1A1A, neutral gray #999.
Minimal, clean, sophisticated. No people, no logos, no recognizable brand marks.
Aspect ratio 3:2, suitable as a website hero banner.
`.trim(),

  /* === photo === 写真風。書斎/ノートとデジタルデバイスの俯瞰。 */
  photo: `
A wide overhead flat-lay editorial photograph for a Japanese startup education platform.
Composition (top-down view, slightly angled): a warm wooden desk surface partially visible,
on it: an open Japanese hardcover book showing handwritten kanji notes about startup phases (アイデア/検証/PMF),
a slim laptop showing a clean dashboard with a growth chart (purple accent line),
a fountain pen, a small ceramic teacup, and a folded copy of a financial newspaper.
The composition leaves the upper-left quadrant clean (negative space for text overlay).
Lighting: soft directional natural light from the upper-right window (golden hour quality, warm).
Style: editorial photography, like Kinfolk magazine or Japanese MUJI catalog. Refined and quiet.
Mood: contemplative, scholarly, ambitious yet calm.
Color palette dominated by warm beige, off-white, deep wood brown, with a single plum purple (#8D4086) accent
in the laptop chart line.
No human hands or faces. No legible text on the screen except an abstract chart.
Sharp focus on the desk objects, slight depth-of-field blur at the edges.
Aspect ratio 3:2.
`.trim(),
};

const prompt = PROMPTS[variant];
if (!prompt) {
  console.error(`unknown variant: ${variant}. choose: ${Object.keys(PROMPTS).join("|")}`);
  process.exit(1);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("ERROR: OPENAI_API_KEY 環境変数が必要です。");
  console.error("例: OPENAI_API_KEY=sk-... node scripts/generate-hero.mjs");
  process.exit(1);
}

const model = process.env.IMAGE_MODEL || "gpt-image-2";

console.log(`▸ model:   ${model}`);
console.log(`▸ variant: ${variant}`);
console.log(`▸ size:    ${size}`);
console.log(`▸ out:     ${path.relative(ROOT, out)}`);
console.log(`▸ prompt:`);
console.log(prompt.split("\n").map((l) => "  " + l).join("\n"));
console.log("");

const res = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model,
    prompt,
    size,
    n: 1,
  }),
});

if (!res.ok) {
  const text = await res.text();
  console.error(`API ERROR ${res.status}: ${text}`);
  // gpt-image-2 が無効なら gpt-image-1 にフォールバック提案
  if (text.includes("model") || res.status === 400) {
    console.error("\nヒント: model 名を変更して再試行 → IMAGE_MODEL=gpt-image-1 node scripts/generate-hero.mjs");
  }
  process.exit(1);
}

const data = await res.json();
const item = data.data?.[0];
if (!item) {
  console.error("ERROR: empty response", JSON.stringify(data));
  process.exit(1);
}

let bytes;
if (item.b64_json) {
  bytes = Buffer.from(item.b64_json, "base64");
} else if (item.url) {
  console.log(`▸ download: ${item.url}`);
  const r = await fetch(item.url);
  bytes = Buffer.from(await r.arrayBuffer());
} else {
  console.error("ERROR: no image content in response");
  process.exit(1);
}

await fs.mkdir(path.dirname(out), { recursive: true });
await fs.writeFile(out, bytes);
console.log(`✓ saved: ${path.relative(ROOT, out)} (${(bytes.length / 1024).toFixed(0)} KB)`);
