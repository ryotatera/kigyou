import Link from "next/link";
import { Bookmark, Users } from "lucide-react";
import type { Video } from "@/lib/types";
import { formatNumber, formatSeconds } from "@/lib/format";
import { strategyLabel } from "@/lib/mockData";

interface Props {
  video: Video;
  size?: "default" | "compact";
}

export function VideoCard({ video, size = "default" }: Props) {
  const s = strategyLabel(video.previewStrategy);
  return (
    <Link
      href={`/videos/${video.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-editorial transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div
        className="relative aspect-video w-full"
        style={{ background: video.posterColor }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink">
          {s.badge}
        </span>
        <span className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white">
          {formatSeconds(video.durationSeconds)}
        </span>
      </div>
      <div
        className={`flex flex-1 flex-col ${
          size === "compact" ? "p-3" : "p-4"
        }`}
      >
        <p className="truncate text-[10px] uppercase tracking-wider text-ink-mute">
          {video.category} · {video.speaker}
        </p>
        <h3
          className={`serif mt-1 line-clamp-2 font-semibold leading-snug text-ink ${
            size === "compact"
              ? "text-sm min-h-[2.5rem]"
              : "text-base min-h-[2.8rem]"
          }`}
        >
          {video.title}
        </h3>
        {size === "default" ? (
          <p className="mt-2 line-clamp-2 min-h-[2.4rem] text-xs leading-relaxed text-ink-soft">
            {video.description}
          </p>
        ) : null}
        <div className="mt-auto flex items-center gap-3 pt-3 text-[11px] text-ink-mute">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" aria-hidden />
            {formatNumber(video.viewerCount)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bookmark className="h-3 w-3" aria-hidden />
            {formatNumber(video.saveCount)}
          </span>
        </div>
      </div>
    </Link>
  );
}
