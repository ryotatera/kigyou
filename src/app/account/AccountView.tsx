"use client";

import Link from "next/link";
import { useMockAuth } from "@/lib/auth";
import { formatSeconds } from "@/lib/format";

interface WatchItem {
  id: string;
  title: string;
  progress: number;
  durationSeconds: number;
  category: string;
}
interface SavedItem {
  id: string;
  title: string;
  durationSeconds: number;
  category: string;
}
interface ArticleStub {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
}

export function AccountView({
  watch,
  saved,
  articles,
}: {
  watch: WatchItem[];
  saved: SavedItem[];
  articles: ArticleStub[];
}) {
  const { state, ready, signOut } = useMockAuth();

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="h-40 animate-pulse rounded-xl bg-paper-warm" aria-hidden />
      </div>
    );
  }

  if (state === "anonymous") {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="serif text-3xl font-semibold text-ink">マイページを見るには</h1>
        <p className="mt-3 text-sm text-ink-soft">
          ログイン、または 10 日間の無料トライアルで会員登録が必要です。
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="rounded-md border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-ink/40"
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            10 日無料で始める
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
            My Page
          </p>
          <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
            マイページ
          </h1>
          <p className="mt-1 text-sm text-ink-mute">
            プラン: 月額プラン · 次回更新日: 2026-06-08
          </p>
        </div>
        <button
          onClick={signOut}
          className="rounded-md border border-line bg-white px-3 py-2 text-xs text-ink-soft hover:border-ink/40"
        >
          ログアウト
        </button>
      </header>

      <section id="history" className="scroll-mt-24">
        <h2 className="serif mb-3 text-xl font-semibold text-ink">続きから視聴</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {watch.map((w) => (
            <li
              key={w.id}
              className="rounded-xl border border-line bg-white p-4 shadow-editorial"
            >
              <p className="text-[10px] uppercase tracking-wider text-ink-mute">
                {w.category}
              </p>
              <Link
                href={`/videos/${w.id}`}
                className="serif mt-1 block text-sm font-semibold text-ink hover:underline"
              >
                {w.title}
              </Link>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper-warm">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${Math.round(w.progress * 100)}%` }}
                />
              </div>
              <p className="mt-1 font-mono text-[10px] text-ink-mute">
                {formatSeconds(Math.floor(w.durationSeconds * w.progress))} /{" "}
                {formatSeconds(w.durationSeconds)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="saved" className="mt-12 scroll-mt-24">
        <h2 className="serif mb-3 text-xl font-semibold text-ink">保存した動画</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {saved.map((s) => (
            <li
              key={s.id}
              className="rounded-xl border border-line bg-white p-4 shadow-editorial"
            >
              <p className="text-[10px] uppercase tracking-wider text-ink-mute">
                {s.category}
              </p>
              <Link
                href={`/videos/${s.id}`}
                className="serif mt-1 block text-sm font-semibold text-ink hover:underline"
              >
                {s.title}
              </Link>
              <p className="mt-2 font-mono text-[10px] text-ink-mute">
                {formatSeconds(s.durationSeconds)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="serif mb-3 text-xl font-semibold text-ink">
          あなたへのおすすめ記事
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {articles.map((a) => (
            <li
              key={a.slug}
              className="rounded-xl border border-line bg-white p-4 shadow-editorial"
            >
              <p className="text-[10px] uppercase tracking-wider text-accent">
                {a.category}
              </p>
              <Link
                href={`/articles/${a.slug}`}
                className="serif mt-1 block text-sm font-semibold text-ink hover:underline"
              >
                {a.title}
              </Link>
              <p className="mt-2 line-clamp-3 text-xs text-ink-soft">{a.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
