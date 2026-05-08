import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";
import { videos } from "@/lib/mockData";
import { categories } from "@/lib/categories";
import { kigyouNoKagakuTotal } from "@/lib/curriculum";
import { VideosBrowser } from "./VideosBrowser";

export const metadata = {
  title: "動画一覧 | 起業の科学ポータル",
  description:
    "起業の科学・起業大全を中心とした、起業家のための動画ライブラリ。",
};

export default function VideosIndex() {
  const cats = ["すべて", ...categories.map((c) => c.name)];
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
          Videos
        </p>
        <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          動画ライブラリ
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          起業の科学・起業大全の本編から、シリコンバレー取材・対談まで。
          まずは無料で観られるイントロから始められます。
        </p>
      </header>

      {/* 起業の科学カリキュラムへの大きな導線（動画ページの中に配置） */}
      <Link
        href="/videos/kigyou-no-kagaku"
        className="group mb-12 flex items-center gap-5 rounded-2xl border border-line bg-paper-warm p-5 shadow-editorial transition hover:border-accent/40 hover:shadow-lg sm:p-6"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
          <Lightbulb className="h-7 w-7" strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
            Curriculum
          </p>
          <p className="serif mt-0.5 text-lg font-semibold text-ink sm:text-xl">
            起業の科学 目次（全 {kigyouNoKagakuTotal} 本・5 章構成）
          </p>
          <p className="mt-1 line-clamp-1 text-xs text-ink-soft">
            アイデアの検証 → 課題 → ソリューション → PMF → 収益性。
            体系的に学ぶカリキュラムを見る。
          </p>
        </div>
        <ArrowRight
          className="h-5 w-5 shrink-0 text-ink-mute transition group-hover:translate-x-1 group-hover:text-accent"
          aria-hidden
        />
      </Link>

      <VideosBrowser videos={videos} categories={cats} />
    </div>
  );
}
