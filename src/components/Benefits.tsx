import type { DbVideo } from "@/lib/db";
import { VideoMockup } from "./benefits/VideoMockup";

interface BenefitsProps {
  featuredVideo?: DbVideo | null;
}

export function Benefits({ featuredVideo = null }: BenefitsProps = {}) {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
            How it works
          </p>
          <h2 className="serif mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            学びを成果に変える、
            <br className="hidden sm:block" />
            <span className="text-accent">3 つの仕組み</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            知識の習得から、現場での判断、続ける力まで。
            起業の科学ポータルが学習を伴走します。
          </p>
        </div>

        <div className="mt-16 space-y-24">
          <BenefitRow
            number="01"
            heading={
              <>
                体系的な学びで、
                <br />
                <span className="text-accent">判断の迷い</span>が減る
              </>
            }
            body="アイデアの検証から PMF、その先のスケールまで。起業の科学・起業大全の体系に沿って、自分が今どのステージにいるか、次に何を検証すべきかが明確になります。"
            mockup={<RoadmapMockup />}
            mockupSide="right"
          />
          <BenefitRow
            number="02"
            heading={
              <>
                動画と記事の往復で、
                <br />
                <span className="text-accent">判断軸</span>が育つ
              </>
            }
            body="動画で骨格を掴み、記事で具体事例を深掘りする。590 本以上の動画と 600 本以上の記事が相互にリンクされ、現場で使える判断軸が積み上がります。"
            mockup={<VideoMockup video={featuredVideo} />}
            mockupSide="left"
          />
          <BenefitRow
            number="03"
            heading={
              <>
                続けやすい仕組みで、
                <br />
                <span className="text-accent">学びが定着</span>する
              </>
            }
            body="続きから再生、しおり、視聴履歴。デバイスを跨いでも前回の続きから。月額 ¥500 で、続けられる学習環境を手に入れられます。"
            mockup={<MyPageMockup />}
            mockupSide="right"
          />
        </div>
      </div>
    </section>
  );
}

function BenefitRow({
  number,
  heading,
  body,
  mockup,
  mockupSide,
}: {
  number: string;
  heading: React.ReactNode;
  body: string;
  mockup: React.ReactNode;
  mockupSide: "left" | "right";
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={mockupSide === "left" ? "lg:order-2" : "lg:order-1"}>
        <p className="text-xs font-mono tracking-wider text-ink-mute">
          Benefit {number}
        </p>
        <h3 className="serif mt-2 text-3xl font-semibold leading-[1.2] text-ink sm:text-[34px]">
          {heading}
        </h3>
        <p className="mt-5 text-base leading-[1.85] text-ink-soft">{body}</p>
      </div>
      <div className={mockupSide === "left" ? "lg:order-1" : "lg:order-2"}>
        <div className="relative">
          {/* 装飾の背景パネル */}
          <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-paper-warm to-paper" />
          <div className="rounded-xl border border-line bg-white shadow-editorial">
            {mockup}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mockup 1: Learning Roadmap ---------- */

function RoadmapMockup() {
  const stages: { name: string; sub: string; progress: number; done: boolean }[] =
    [
      { name: "アイデアの検証", sub: "Stage 0", progress: 100, done: true },
      { name: "顧客課題仮説 (CPF)", sub: "Stage 1", progress: 100, done: true },
      { name: "解決策仮説 (PSF)", sub: "Stage 2", progress: 78, done: false },
      { name: "Product Market Fit", sub: "Stage 3", progress: 22, done: false },
      { name: "Transition to Scale", sub: "Stage 4", progress: 0, done: false },
    ];
  return (
    <div className="overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-paper-warm px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[11px] text-ink-mute">
          学習ロードマップ
        </span>
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] text-ink-mute">あなたの学習進捗</p>
            <p className="serif mt-1 text-2xl font-semibold text-ink">
              45<span className="text-base text-ink-mute">%</span>
            </p>
          </div>
          <div className="text-right text-[11px] text-ink-mute">
            <p>修了 18 / 全 40 章</p>
            <p>視聴時間 7h 22m</p>
          </div>
        </div>
        <ol className="space-y-3">
          {stages.map((s, i) => (
            <li key={s.name} className="flex items-center gap-3">
              <div className="relative flex flex-col items-center">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 font-mono text-[10px] ${
                    s.done
                      ? "border-accent bg-accent text-white"
                      : s.progress > 0
                        ? "border-accent bg-white text-accent"
                        : "border-line bg-paper-warm text-ink-mute"
                  }`}
                >
                  {s.done ? "✓" : i}
                </span>
                {i < stages.length - 1 ? (
                  <span
                    className={`mt-1 h-2 w-px ${
                      s.done ? "bg-accent/60" : "bg-line"
                    }`}
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p
                    className={`truncate text-sm font-medium ${
                      s.progress > 0 ? "text-ink" : "text-ink-mute"
                    }`}
                  >
                    {s.name}
                  </p>
                  <p className="font-mono text-[10px] text-ink-mute">
                    {s.sub}
                  </p>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-paper-warm">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------- Mockup 3: My Page (Continue Watching) ---------- */

function MyPageMockup() {
  const items: { title: string; cat: string; progress: number; color: string }[] =
    [
      {
        title: "PMF とは何か",
        cat: "起業の科学",
        progress: 0.42,
        color: "#2A2A2A",
      },
      {
        title: "起業大全：競争戦略の全体像",
        cat: "起業大全",
        progress: 0.18,
        color: "#1F2A3A",
      },
      {
        title: "対談：CVC 投資家が見る…",
        cat: "対談",
        progress: 0.71,
        color: "#2E3D4D",
      },
    ];
  return (
    <div className="overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-line bg-paper-warm px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[11px] text-ink-mute">
          マイページ
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-ink-mute">こんにちは</p>
            <p className="serif mt-0.5 text-lg font-semibold text-ink">
              田中 起子 さん
            </p>
          </div>
          <div className="rounded-md border border-line bg-paper-warm px-2.5 py-1 text-[10px] text-ink-soft">
            <p className="font-mono">月額プラン</p>
            <p className="font-mono text-ink-mute">次回更新 6/8</p>
          </div>
        </div>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
          続きから視聴
        </p>
        <ul className="mt-2 space-y-2">
          {items.map((it) => (
            <li
              key={it.title}
              className="flex items-center gap-3 rounded-md border border-line bg-white px-3 py-2.5"
            >
              <div
                className="h-10 w-16 shrink-0 rounded-sm"
                style={{ background: it.color }}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-wider text-ink-mute">
                  {it.cat}
                </p>
                <p className="serif truncate text-[13px] font-semibold leading-snug text-ink">
                  {it.title}
                </p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-paper-warm">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${Math.round(it.progress * 100)}%` }}
                  />
                </div>
              </div>
              <span className="font-mono text-[10px] text-ink-mute">
                {Math.round(it.progress * 100)}%
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center text-[10px] text-ink-mute">
          <div>
            <p className="serif text-base font-semibold text-ink">12</p>
            <p>今月視聴本数</p>
          </div>
          <div>
            <p className="serif text-base font-semibold text-ink">7h</p>
            <p>累計時間</p>
          </div>
          <div>
            <p className="serif text-base font-semibold text-ink">5</p>
            <p>連続日数</p>
          </div>
        </div>
      </div>
    </div>
  );
}
