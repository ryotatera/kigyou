import Link from "next/link";
import { Lightbulb, Search, Wrench, Target, TrendingUp } from "lucide-react";
import {
  kigyouNoKagakuCurriculum,
  kigyouNoKagakuTotal,
} from "@/lib/curriculum";
import { SignupLink } from "@/components/ExternalCTA";

export const metadata = {
  title: "起業の科学 目次（全 104 本・5 章構成）| 起業の科学ポータル",
  description:
    "田所雅之『起業の科学』を体系化したオンラインカリキュラムの全目次。アイデアの検証から PMF 達成、収益性改善まで、5 章 21 サブ章・104 本の動画で学べます。",
  alternates: { canonical: "/videos/kigyou-no-kagaku" },
  openGraph: {
    title: "起業の科学 目次（全 104 本・5 章構成）",
    description:
      "アイデアの検証から PMF 達成、収益性改善まで、5 章・104 本で学ぶ起業の科学カリキュラム",
    type: "article",
  },
};

const ICONS = [Lightbulb, Search, Wrench, Target, TrendingUp];

export default function KigyouNoKagakuCurriculum() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "起業の科学",
    description:
      "アイデアの検証から PMF 達成、収益性改善まで、5 章・104 本で学ぶ起業のカリキュラム",
    provider: {
      "@type": "Organization",
      name: "起業の科学ポータル",
    },
    hasCourseInstance: kigyouNoKagakuCurriculum.map((c) => ({
      "@type": "CourseInstance",
      name: `第 ${c.number} 章 ${c.title}`,
      description: c.description,
      courseMode: "online",
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-line bg-paper-warm">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Link
            href="/videos"
            className="mb-4 inline-flex items-center text-xs text-ink-mute hover:text-ink"
          >
            ← 動画ライブラリ
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
            Curriculum
          </p>
          <h1 className="serif mt-3 text-4xl font-semibold leading-[1.15] text-ink sm:text-[52px]">
            起業の科学 目次
            <br />
            <span className="text-accent">全 {kigyouNoKagakuTotal} 本・5 章構成</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            アイデアの検証 → 課題の質を上げる → ソリューションの検証 → 人が欲しがるものを作る →
            収益性を改善 & 勝ち続ける仕組み構築。 田所雅之『起業の科学』を、
            オンライン動画として体系化したカリキュラムの全目次です。
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-4">
            <Stat label="章" value="5" />
            <Stat label="サブ章" value="21" />
            <Stat label="動画" value={String(kigyouNoKagakuTotal)} sub="本" />
            <Stat label="平均視聴時間" value="6" sub="分 / 本" />
          </dl>
        </div>
      </section>

      {/* 章ごとの一覧 */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <ol className="space-y-6">
          {kigyouNoKagakuCurriculum.map((c, idx) => {
            const Icon = ICONS[idx] ?? Lightbulb;
            return (
              <li key={c.number}>
                <article
                  id={`chapter-${c.number}`}
                  className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-white shadow-editorial"
                >
                  {/* チャプターヘッダ */}
                  <div className="flex items-start gap-5 border-b border-line p-6 sm:p-8">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white sm:h-16 sm:w-16"
                      style={{ background: c.color }}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[11px] font-mono font-semibold uppercase tracking-wider"
                        style={{ color: c.color }}
                      >
                        Chapter {c.number} · {c.videoCount} 本
                      </p>
                      <h2 className="serif mt-1 text-2xl font-semibold leading-snug text-ink sm:text-[28px]">
                        {c.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {c.description}
                      </p>
                    </div>
                  </div>

                  {/* サブ章 */}
                  <ul className="divide-y divide-line">
                    {c.subChapters.map((s) => (
                      <li
                        key={s.id}
                        className="flex items-center gap-4 px-6 py-4 transition hover:bg-paper-warm sm:px-8"
                      >
                        <span
                          className="serif w-12 shrink-0 font-mono text-sm font-semibold"
                          style={{ color: c.color }}
                        >
                          {s.id}
                        </span>
                        <p className="flex-1 text-sm font-medium text-ink">
                          {s.title}
                        </p>
                        <span className="font-mono text-xs text-ink-mute">
                          {s.videoCount} 本
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-ink text-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-paper/60">
            10 日間 無料トライアル
          </p>
          <h2 className="serif mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            104 本の動画で、
            <br className="sm:hidden" />
            起業の解像度を上げる。
          </h2>
          <p className="mt-4 text-base text-paper/80">
            ¥500 / 月、いつでもキャンセル可能。クレジットカード不要で開始できます。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <SignupLink className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark">
              10 日無料で始める
            </SignupLink>
            <Link
              href="/pricing"
              className="rounded-md border border-paper/30 bg-transparent px-6 py-3 text-sm font-semibold text-paper hover:bg-white/10"
            >
              料金を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <dt className="text-xs text-ink-mute">{label}</dt>
      <dd className="mt-1">
        <span className="serif text-3xl font-semibold text-ink">{value}</span>
        {sub ? <span className="ml-1 text-xs text-ink-mute">{sub}</span> : null}
      </dd>
    </div>
  );
}
