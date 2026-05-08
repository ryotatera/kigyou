import fs from "node:fs/promises";
import path from "node:path";

interface Tile {
  posterColor: string;
}

interface Props {
  fallbackTiles: Tile[];
}

const HERO_FILE = "hero.png";
const PUBLIC_HERO_PATH = path.join(process.cwd(), "public", HERO_FILE);

async function heroExists(): Promise<boolean> {
  try {
    await fs.access(PUBLIC_HERO_PATH);
    return true;
  } catch {
    return false;
  }
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * ヒーロー右側の FV ビジュアル。
 * - public/hero.png が存在すればそれを表示（gpt-image-2 で生成想定）
 * - 無ければサムネ モザイクのフォールバック
 */
export async function HeroVisual({ fallbackTiles }: Props) {
  const hasHero = await heroExists();

  if (hasHero) {
    return (
      <div className="relative hidden sm:block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-editorial">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/${HERO_FILE}`}
            alt="起業の科学ポータル"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  // フォールバック：サムネモザイク
  return (
    <div className="relative hidden sm:block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#502952] to-[#2a2a2a] shadow-editorial">
        <div className="absolute inset-0 grid grid-cols-3 gap-1 p-6 opacity-40">
          {fallbackTiles.map((v, i) => (
            <div
              key={i}
              className="rounded-md"
              style={{ background: v.posterColor }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6">
          <p className="serif text-2xl font-semibold leading-tight text-white">
            起業の知見を、
            <br />
            毎日の意思決定に。
          </p>
        </div>
      </div>
    </div>
  );
}
