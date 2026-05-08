"use client";

import Link from "next/link";
import { useState } from "react";
import type { Article } from "@/lib/articles";
import { useMockAuth } from "@/lib/auth";

export function ArticleBody({ article }: { article: Article }) {
  const { state, signIn, ready } = useMockAuth();
  const isMember = state === "member";
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!ready) {
    return <div className="h-72 animate-pulse rounded bg-paper-warm" aria-hidden />;
  }

  const visibleParagraphs = isMember
    ? article.paragraphs
    : article.paragraphs.filter((p) => p.isPublic);
  const remaining = isMember
    ? 0
    : article.paragraphs.filter((p) => !p.isPublic).length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      signIn();
      setSubmitting(false);
    }, 300);
  };

  return (
    <div className="space-y-5 text-base leading-[1.85] text-ink">
      {visibleParagraphs.map((p, i) => (
        <p key={i}>{p.text}</p>
      ))}

      {!isMember && remaining > 0 ? (
        <div className="relative mt-8">
          <div
            className="pointer-events-none absolute -top-24 left-0 right-0 h-24"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 70%, #FFFFFF 100%)",
            }}
            aria-hidden
          />
          <div className="overlay-in mx-auto max-w-xl rounded-xl border border-line bg-white p-6 shadow-editorial sm:p-8">
            <p className="text-xs uppercase tracking-wider text-accent">
              続きは会員限定
            </p>
            <h2 className="serif mt-2 text-2xl font-semibold leading-snug text-ink">
              この記事の続きを読む
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              残り {remaining} つの段落と、登壇者本人による具体事例。
              10 日間無料、クレジットカード不要で読み続けられます。
            </p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <input
                type="email"
                required
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-line bg-paper px-4 py-3 text-base text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-accent px-4 py-3 text-base font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
              >
                {submitting ? "登録中…" : "メールで登録して読み続ける"}
              </button>
            </form>
            <p className="mt-3 text-center text-xs text-ink-mute">
              既に会員の方は{" "}
              <Link href="/login" className="font-medium text-ink underline">
                ログイン
              </Link>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
