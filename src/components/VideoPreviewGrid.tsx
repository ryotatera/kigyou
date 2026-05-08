"use client";

import { useState } from "react";
import { Lock, Play } from "lucide-react";
import type { DbVideo } from "@/lib/db";

interface Props {
  videos: DbVideo[];
}

const PREVIEW_SECONDS = 60; // 60 秒だけ視聴可

export function VideoPreviewGrid({ videos }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => {
        const playing = activeId === v.id;
        const ytId = v.youtubeId;
        const thumb =
          v.thumbnailUrl ||
          (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "");
        return (
          <li
            key={v.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-editorial transition hover:shadow-lg"
          >
            <div className="relative aspect-video bg-black">
              {playing && ytId ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&start=0&end=${PREVIEW_SECONDS}`}
                  title={v.title}
                  allow="accelerated-2d-canvas; autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => setActiveId(v.id)}
                  className="group/btn absolute inset-0 flex items-center justify-center"
                  aria-label={`${v.title} を再生`}
                >
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt={v.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-2xl transition group-hover/btn:scale-110">
                    <Play className="h-7 w-7 fill-current" aria-hidden />
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft">
                    無料で {PREVIEW_SECONDS} 秒試聴
                  </span>
                  {v.duration ? (
                    <span className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white">
                      {fmtDuration(v.duration)}
                    </span>
                  ) : null}
                </button>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2 text-[11px]">
                {v.chapter ? (
                  <span className="rounded-full bg-paper-warm px-2 py-0.5 font-mono text-ink-soft">
                    {v.chapter}
                    {v.step ? ` · ${v.step}` : ""}
                  </span>
                ) : null}
                <span className="font-mono text-ink-mute">
                  👁 {v.viewCount.toLocaleString()}
                </span>
              </div>
              <h3 className="serif mt-2 line-clamp-2 min-h-[2.6rem] text-base font-semibold leading-snug text-ink">
                {v.title}
              </h3>
              <a
                href="https://video-search-app-ten.vercel.app/auth/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium text-accent hover:underline"
              >
                <Lock className="h-3 w-3" aria-hidden />
                フル動画を観る（無料登録）
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function fmtDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
