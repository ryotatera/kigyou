"use client";

import { useState } from "react";
import { Lock, Play, Bookmark, Users } from "lucide-react";
import type { DbVideo } from "@/lib/db";

interface Props {
  video: DbVideo;
}

const PREVIEW_SECONDS = 60;

/**
 * 注目の動画セクションのフックとして、実 YouTube 動画を埋め込む。
 * クリックで iframe を読み込み、60 秒だけ自動再生する。
 */
export function FeaturedHero({ video }: Props) {
  const [playing, setPlaying] = useState(false);
  const ytId = video.youtubeId;
  const thumb =
    video.thumbnailUrl ||
    (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "");

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-editorial">
      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        {/* 動画プレイヤー */}
        <div className="relative aspect-video bg-black lg:aspect-auto">
          {playing && ytId ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&start=0&end=${PREVIEW_SECONDS}`}
              title={video.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group/btn absolute inset-0 flex items-center justify-center"
              aria-label={`${video.title} を再生`}
            >
              {thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumb}
                  alt={video.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              ) : null}
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* 再生ボタン */}
              <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-black shadow-2xl transition group-hover/btn:scale-110">
                <Play className="h-8 w-8 fill-current" aria-hidden />
              </span>

              {/* バッジ */}
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-ink">
                無料で {PREVIEW_SECONDS} 秒試聴
              </span>
              {video.duration ? (
                <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 font-mono text-xs text-white">
                  {fmtDuration(video.duration)}
                </span>
              ) : null}
            </button>
          )}
        </div>

        {/* 右側のテキスト */}
        <div className="flex flex-col p-6 sm:p-8">
          {video.chapter ? (
            <p className="text-[11px] uppercase tracking-wider text-accent">
              {video.chapter}
              {video.step ? ` · ${video.step}` : ""}
            </p>
          ) : null}
          <h3 className="serif mt-1 text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {video.title}
          </h3>
          {video.description ? (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
              {video.description}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-ink-mute">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" aria-hidden />
              {video.viewCount.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bookmark className="h-3 w-3" aria-hidden />
              保存できます
            </span>
            <span className="ml-auto rounded-full bg-accent/10 px-2.5 py-1 text-accent">
              最初の 60 秒は無料
            </span>
          </div>

          <a
            href="https://video-search-app-ten.vercel.app/auth/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark"
          >
            <Lock className="h-4 w-4" aria-hidden />
            続きを観る（10 日間 無料）
          </a>
          <p className="mt-2 text-center text-[11px] text-ink-mute">
            クレジットカード不要 · いつでも解約可能
          </p>
        </div>
      </div>
    </div>
  );
}

function fmtDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
