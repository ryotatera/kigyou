import type { ThumbItem } from "@/lib/db";

interface Props {
  items: ThumbItem[];
}

/**
 * 動画＋IPO＋AI 記事のサムネイルを敷き詰めるビジュアルウォール。
 * - メイン (lg:cols-8) で 24-32 タイル
 * - フェードグラデーション・透明度パターン・アクセントタイルでリズム
 */
export function ThumbnailWall({ items }: Props) {
  if (items.length === 0) return null;

  // 最大 32 件、5 段に分けて配置
  const tiles = items.slice(0, 32);

  return (
    <div className="relative">
      {/* グラデーション縁取り（左右）— 印象を柔らかく */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-ink to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-ink to-transparent sm:w-16" />

      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5 sm:gap-2 lg:grid-cols-8">
        {tiles.map((it, i) => (
          <Tile key={`${it.url}-${i}`} item={it} index={i} />
        ))}
      </div>
    </div>
  );
}

function Tile({ item, index }: { item: ThumbItem; index: number }) {
  // 透明度を波状に：自然な視覚リズム
  const variants = [0.55, 0.7, 0.95, 0.7, 0.55, 0.85, 0.6, 1];
  const opacity = variants[index % variants.length];

  // ラベル色：種別ごと
  const ringClass =
    item.kind === "ipo"
      ? "ring-1 ring-amber-300/30"
      : item.kind === "ai"
        ? "ring-1 ring-blue-300/30"
        : "";

  return (
    <div
      className={`group relative aspect-video overflow-hidden rounded transition ${ringClass}`}
      style={{ opacity }}
      title={item.title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.url}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-110"
        aria-hidden
      />
      {item.kind !== "video" ? (
        <span
          className={`absolute left-1 top-1 rounded-sm px-1 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider ${
            item.kind === "ipo"
              ? "bg-amber-300/95 text-amber-950"
              : "bg-sky-300/95 text-sky-950"
          }`}
        >
          {item.kind === "ipo" ? "IPO" : "AI"}
        </span>
      ) : null}
    </div>
  );
}
