import type { ThumbItem } from "@/lib/db";

interface Props {
  items: ThumbItem[];
}

/**
 * 動画＋IPO＋AI 記事のサムネイルを敷き詰めるビジュアルウォール。
 * - 2 行構成、左右逆向きにマーキー（auto-scroll）
 * - hover でアニメーション一時停止、reduced-motion 対応
 */
export function ThumbnailWall({ items }: Props) {
  if (items.length === 0) return null;

  // 2 行に分割（奇数 / 偶数 index）
  const row1 = items.filter((_, i) => i % 2 === 0);
  const row2 = items.filter((_, i) => i % 2 === 1);

  return (
    <div className="marquee-track relative space-y-3 overflow-hidden">
      {/* グラデ縁取り（左右）— 端をフェード */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent sm:w-24" />

      <Row items={row1} direction="left" />
      <Row items={row2} direction="right" />
    </div>
  );
}

function Row({
  items,
  direction,
}: {
  items: ThumbItem[];
  direction: "left" | "right";
}) {
  // 2 セットを連結（-50% アニメーションでシームレスループ）
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-3 ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
      >
        {doubled.map((it, i) => (
          <Tile key={`${it.url}-${i}`} item={it} />
        ))}
      </div>
    </div>
  );
}

function Tile({ item }: { item: ThumbItem }) {
  const ringClass =
    item.kind === "ipo"
      ? "ring-1 ring-amber-300/30"
      : item.kind === "ai"
        ? "ring-1 ring-sky-300/30"
        : "";

  return (
    <div
      className={`group relative aspect-video w-44 shrink-0 overflow-hidden rounded sm:w-56 ${ringClass}`}
      title={item.title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.url}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      {item.kind !== "video" ? (
        <span
          className={`absolute left-1.5 top-1.5 rounded-sm px-1.5 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider ${
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
