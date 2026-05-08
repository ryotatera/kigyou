"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { DbVideo } from "@/lib/db";
import { PreviewEndedBanner } from "@/components/VideoPreviewGrid";
import { formatNumber } from "@/lib/format";

const PREVIEW_SECONDS = 180;

interface Props {
  video: DbVideo | null;
}

export function VideoMockup({ video }: Props) {
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const startWatch = () => {
    setPlaying(true);
    setEnded(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setEnded(true), PREVIEW_SECONDS * 1000);
  };

  const ytId = video?.youtubeId;
  const title = video?.title ?? "PMF とは何か — Product Market Fit の正体";
  const thumb =
    video?.thumbnailUrl ||
    (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "");
  const chapter = video?.chapter
    ? `${video.chapter}${video.step ? ` · ${video.step}` : ""}`
    : "第 1 章";
  const viewCount = video?.viewCount ?? 0;
  const duration = video?.duration ?? 1722;

  return (
    <div className="overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-paper-warm px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 line-clamp-1 font-mono text-[11px] text-ink-mute">
          {title}
        </span>
      </div>

      <div className="p-4">
        {/* Video frame — 実 YouTube */}
        <div className="relative aspect-video overflow-hidden rounded-md bg-black">
          {playing && ytId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&start=0&end=${PREVIEW_SECONDS}`}
              title={title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <button
              onClick={ytId ? startWatch : undefined}
              className="group/btn absolute inset-0 flex items-center justify-center"
              aria-label={ytId ? `${title} を再生` : "再生不可"}
              disabled={!ytId}
            >
              {thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumb}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-[#2A2A2A]" />
              )}
              <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-ink">
                3 分試聴
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-base text-black shadow-lg transition group-hover/btn:scale-110">
                  <Play className="h-5 w-5 fill-current" aria-hidden />
                </span>
              </div>
              <div className="absolute inset-x-3 bottom-3">
                <div className="relative h-1 rounded-full bg-white/15">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-accent/80"
                    style={{ width: "32%" }}
                  />
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-white"
                    style={{ width: "12%" }}
                  />
                </div>
                <div className="mt-1 flex justify-between font-mono text-[10px] text-white/80">
                  <span>
                    {fmtTime(duration * 0.12)} / {fmtTime(duration)}
                  </span>
                  <span>{chapter}</span>
                  <span>視聴 {formatNumber(viewCount)}</span>
                </div>
              </div>
            </button>
          )}
          {ended ? <PreviewEndedBanner /> : null}
        </div>

        {/* Related articles */}
        <div className="mt-3">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
            この動画に関連する記事
          </p>
          <ul className="grid grid-cols-2 gap-2">
            <li className="rounded-md border border-line bg-paper-warm px-3 py-2">
              <p className="text-[9px] uppercase tracking-wider text-accent">
                考察
              </p>
              <p className="serif mt-0.5 line-clamp-2 text-[12px] font-semibold leading-snug text-ink">
                PMF の正体は「言葉にならない引力」である
              </p>
              <p className="mt-1 font-mono text-[9px] text-ink-mute">
                読了 8 分
              </p>
            </li>
            <li className="rounded-md border border-line bg-paper-warm px-3 py-2">
              <p className="text-[9px] uppercase tracking-wider text-accent">
                観察
              </p>
              <p className="serif mt-0.5 line-clamp-2 text-[12px] font-semibold leading-snug text-ink">
                CPF で陥る 3 つの罠
              </p>
              <p className="mt-1 font-mono text-[9px] text-ink-mute">
                読了 6 分
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function fmtTime(sec: number): string {
  const t = Math.floor(sec);
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
