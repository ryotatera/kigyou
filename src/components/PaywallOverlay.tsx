"use client";

import { useState } from "react";
import type { Video } from "@/lib/types";
import { formatSeconds } from "@/lib/format";
import { track } from "@/lib/analytics";

interface Props {
  video: Video;
  open: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

export function PaywallOverlay({ video, open, onClose, onSignIn }: Props) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const remaining = Math.max(0, video.durationSeconds - video.previewEndSeconds);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    track({
      type: "video_paywall_clicked",
      videoId: video.id,
      ctaLabel: "30秒で登録",
    });
    // 模擬：300ms で会員化（B-04: 30 秒で再生再開）
    setTimeout(() => {
      track({
        type: "video_signup_converted",
        videoId: video.id,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
      onSignIn();
      setSubmitting(false);
    }, 300);
  };

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/65 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-headline"
    >
      <div className="overlay-in mx-4 w-full max-w-xl rounded-xl bg-paper p-6 shadow-2xl sm:p-8">
        {/* B-03 損失回避フック ヘッドライン */}
        <h2
          id="paywall-headline"
          className="serif text-center text-2xl font-semibold leading-snug text-ink sm:text-[28px]"
        >
          {video.paywallMessage}
        </h2>

        <p className="mt-2 text-center text-sm text-ink-mute">
          残り {formatSeconds(remaining)} の本編・590+ 本の動画ライブラリ・
          田所視点の Insights 記事 600+ 本
        </p>

        {/* B-04 30 秒登録（メール 1 つ） */}
        <form onSubmit={submit} className="mt-6 space-y-3">
          <label className="block text-xs font-medium text-ink-mute" htmlFor="email">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            required
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-line bg-white px-4 py-3 text-base text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-accent px-4 py-3.5 text-base font-semibold text-white transition hover:bg-accent-dark disabled:opacity-60"
          >
            {submitting ? "登録中…" : "30 秒で登録して続きを観る"}
          </button>
          <p className="text-center text-xs text-ink-mute">
            登録で 10 日トライアルが自動付与されます。クレジットカード不要。
          </p>
        </form>

        {/* チェックリスト（特典の見える化） */}
        <ul className="mt-6 grid gap-2 text-sm text-ink-soft">
          <li className="flex gap-2">
            <span className="text-accent">✓</span>
            残り {formatSeconds(remaining)} の本編をそのまま視聴
          </li>
          <li className="flex gap-2">
            <span className="text-accent">✓</span>
            590+ 本の動画ライブラリ
          </li>
          <li className="flex gap-2">
            <span className="text-accent">✓</span>
            田所視点の Insights 記事 600+ 本
          </li>
        </ul>

        {/* 既存会員導線 */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <button onClick={onClose} className="text-ink-mute hover:underline">
            ← 閉じる
          </button>
          <span className="text-ink-mute">
            既に会員の方は{" "}
            <button onClick={onSignIn} className="font-medium text-ink underline">
              ログイン
            </button>
          </span>
        </div>

        {/* B-05 関連動画予告 */}
        <div className="mt-7 border-t border-line pt-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-mute">
            あなたが観るかもしれない動画
          </p>
          <div className="grid grid-cols-3 gap-3">
            {video.related.map((r) => (
              <div
                key={r.id}
                className="overflow-hidden rounded-md border border-line bg-white"
              >
                <div
                  className="aspect-video"
                  style={{ background: r.thumbColor }}
                  aria-hidden
                />
                <div className="p-2">
                  <p className="line-clamp-2 text-xs font-medium text-ink">{r.title}</p>
                  <p className="mt-1 font-mono text-[10px] text-ink-mute">
                    {r.durationLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
