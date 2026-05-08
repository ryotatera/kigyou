"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, Lock, Maximize2, Pause, Play, Users } from "lucide-react";
import type { Video } from "@/lib/types";
import { formatNumber, formatSeconds } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { AuthState } from "@/lib/auth";

interface Props {
  video: Video;
  authState: AuthState;
  onPaywallChange: (open: boolean) => void;
}

export function VideoPlayer({ video, authState, onPaywallChange }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progressMilestones, setProgressMilestones] = useState<{
    p25: boolean;
    p50: boolean;
  }>({ p25: false, p50: false });

  const isMember = authState === "member";
  const previewEnd = video.previewEndSeconds;
  const playableDuration = isMember ? video.durationSeconds : previewEnd;
  const remainingPublic = Math.max(0, previewEnd - current);
  const showPill = !isMember && hasStarted && remainingPublic > 0 && remainingPublic <= 30;

  useEffect(() => {
    onPaywallChange(paywallOpen);
  }, [paywallOpen, onPaywallChange]);

  // 会員に切り替わったときはペイウォールを閉じて再生再開
  useEffect(() => {
    if (isMember && paywallOpen) {
      setPaywallOpen(false);
      const el = ref.current;
      if (el) void el.play().catch(() => undefined);
    }
  }, [isMember, paywallOpen]);

  const handleTimeUpdate = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const t = el.currentTime;
    setCurrent(t);

    if (!isMember && t >= previewEnd - 0.05) {
      el.pause();
      // 公開区間終端で必ず終端に揃える
      el.currentTime = previewEnd;
      if (!paywallOpen) {
        setPaywallOpen(true);
        track({
          type: "video_paywall_shown",
          videoId: video.id,
          currentSeconds: Math.floor(previewEnd),
        });
      }
      return;
    }

    const dur = video.durationSeconds;
    if (dur > 0) {
      const ratio = t / dur;
      if (!progressMilestones.p25 && ratio >= 0.25) {
        track({ type: "video_25_percent", videoId: video.id });
        setProgressMilestones((m) => ({ ...m, p25: true }));
      }
      if (!progressMilestones.p50 && ratio >= 0.5) {
        track({ type: "video_50_percent", videoId: video.id });
        setProgressMilestones((m) => ({ ...m, p50: true }));
      }
    }
  }, [
    isMember,
    paywallOpen,
    previewEnd,
    progressMilestones.p25,
    progressMilestones.p50,
    video.durationSeconds,
    video.id,
  ]);

  const handlePlay = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
      track({
        type: "video_play_started",
        videoId: video.id,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
    }
  }, [hasStarted, video.id]);

  const handleEnded = useCallback(() => {
    track({ type: "video_completed", videoId: video.id });
  }, [video.id]);

  const previewRatio = useMemo(() => {
    if (video.durationSeconds <= 0) return 0;
    return Math.min(1, previewEnd / video.durationSeconds);
  }, [previewEnd, video.durationSeconds]);

  const playedRatio = useMemo(() => {
    const denom = isMember ? video.durationSeconds : previewEnd;
    if (denom <= 0) return 0;
    return Math.min(1, current / denom) * (isMember ? 1 : previewRatio);
  }, [current, isMember, previewEnd, previewRatio, video.durationSeconds]);

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const target = pct * video.durationSeconds;
    if (!isMember && target > previewEnd) {
      el.currentTime = previewEnd;
      el.pause();
      if (!paywallOpen) {
        setPaywallOpen(true);
        track({
          type: "video_paywall_shown",
          videoId: video.id,
          currentSeconds: Math.floor(previewEnd),
        });
      }
      return;
    }
    el.currentTime = target;
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a] shadow-editorial">
      <div className="relative aspect-video w-full">
        <video
          ref={ref}
          src={video.videoUrl}
          poster=""
          className="h-full w-full bg-black"
          controls={false}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onEnded={handleEnded}
          style={{ background: video.posterColor }}
        />

        {/* 残り時間ピル */}
        {showPill ? (
          <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm pill-pulse">
            <Lock className="h-3 w-3" aria-hidden />
            <span>あと {Math.ceil(remainingPublic)} 秒で会員限定</span>
          </div>
        ) : null}

        {/* 大きな再生ボタン（停止時表示） */}
        {!hasStarted ? (
          <button
            onClick={() => {
              const el = ref.current;
              if (!el) return;
              void el.play().catch(() => undefined);
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 text-white transition hover:bg-black/40"
            aria-label="再生"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-black shadow-xl">
              <Play className="h-8 w-8 fill-current" aria-hidden />
            </span>
          </button>
        ) : null}
      </div>

      {/* コントロールバー */}
      <div className="bg-[#101010] px-4 py-3 text-white">
        {/* プログレスバー（公開区間カラー分割） */}
        <div
          className="relative mb-3 h-1.5 cursor-pointer rounded-full bg-white/15"
          onClick={onSeek}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={video.durationSeconds}
          aria-valuenow={Math.floor(current)}
          tabIndex={0}
        >
          {/* 公開区間（accent カラー） */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-accent/80"
            style={{ width: `${previewRatio * 100}%` }}
            aria-hidden
          />
          {/* 再生済み */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-white"
            style={{ width: `${playedRatio * 100}%` }}
            aria-hidden
          />
          {/* ペイウォール マーカー */}
          {!isMember ? (
            <div
              className="absolute -top-1 h-3.5 w-0.5 bg-accent"
              style={{ left: `calc(${previewRatio * 100}% - 1px)` }}
              aria-hidden
            />
          ) : null}
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <PlayPauseButton videoEl={ref.current} />
            <span className="font-mono tabular-nums">
              {formatSeconds(current)} / {formatSeconds(playableDuration)}
              {!isMember ? (
                <span className="ml-2 text-white/50">
                  （フル {formatSeconds(video.durationSeconds)}）
                </span>
              ) : null}
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <button className="hover:text-white" aria-label="字幕">
              字幕
            </button>
            <button className="hover:text-white" aria-label="画質">
              画質
            </button>
            <button className="hover:text-white" aria-label="フルスクリーン">
              <Maximize2 className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-[#0a0a0a] px-4 pb-3 text-xs text-white/70">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3 w-3" aria-hidden />
          {formatNumber(video.viewerCount)} 人が視聴
        </span>
        <span className="text-white/30">/</span>
        <span className="inline-flex items-center gap-1.5">
          <Bookmark className="h-3 w-3" aria-hidden />
          {formatNumber(video.saveCount)} 件保存
        </span>
      </div>
    </div>
  );
}

function PlayPauseButton({ videoEl }: { videoEl: HTMLVideoElement | null }) {
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    if (!videoEl) return;
    const update = () => setPaused(videoEl.paused);
    update();
    videoEl.addEventListener("play", update);
    videoEl.addEventListener("pause", update);
    return () => {
      videoEl.removeEventListener("play", update);
      videoEl.removeEventListener("pause", update);
    };
  }, [videoEl]);

  return (
    <button
      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm hover:bg-white/20"
      aria-label={paused ? "再生" : "一時停止"}
      onClick={() => {
        if (!videoEl) return;
        if (videoEl.paused) void videoEl.play().catch(() => undefined);
        else videoEl.pause();
      }}
    >
      {paused ? (
        <Play className="h-3 w-3 fill-current" aria-hidden />
      ) : (
        <Pause className="h-3 w-3 fill-current" aria-hidden />
      )}
    </button>
  );
}
