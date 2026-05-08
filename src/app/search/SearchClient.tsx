"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Video } from "@/lib/types";
import { VideoCard } from "@/components/VideoCard";

interface ArticleStub {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

interface Props {
  videos: Video[];
  articles: ArticleStub[];
}

export function SearchClient({ videos, articles }: Props) {
  const [q, setQ] = useState("");

  const { v, a } = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return { v: [], a: [] };
    const v = videos.filter(
      (x) =>
        x.title.toLowerCase().includes(needle) ||
        x.description.toLowerCase().includes(needle) ||
        x.speaker.toLowerCase().includes(needle) ||
        x.category.toLowerCase().includes(needle),
    );
    const a = articles.filter(
      (x) =>
        x.title.toLowerCase().includes(needle) ||
        x.excerpt.toLowerCase().includes(needle) ||
        x.category.toLowerCase().includes(needle),
    );
    return { v, a };
  }, [q, videos, articles]);

  return (
    <div>
      <div className="mt-6">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="例: PMF、競争戦略、ピッチ"
          className="w-full rounded-md border border-line bg-white px-5 py-3 text-base text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {!q.trim() ? (
        <p className="mt-8 rounded-xl border border-line bg-white p-10 text-center text-sm text-ink-mute">
          キーワードを入力すると、動画と記事の中から検索します。
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          <section>
            <h2 className="serif mb-4 text-xl font-semibold text-ink">
              動画 <span className="text-sm text-ink-mute">{v.length} 件</span>
            </h2>
            {v.length === 0 ? (
              <p className="text-sm text-ink-mute">該当する動画はありません。</p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {v.map((x) => (
                  <li key={x.id}>
                    <VideoCard video={x} size="compact" />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="serif mb-4 text-xl font-semibold text-ink">
              記事 <span className="text-sm text-ink-mute">{a.length} 件</span>
            </h2>
            {a.length === 0 ? (
              <p className="text-sm text-ink-mute">該当する記事はありません。</p>
            ) : (
              <ul className="space-y-3">
                {a.map((x) => (
                  <li
                    key={x.slug}
                    className="rounded-xl border border-line bg-white p-4 hover:border-ink/40"
                  >
                    <Link href={`/articles/${x.slug}`} className="block">
                      <p className="text-[10px] uppercase tracking-wider text-accent">
                        {x.category}
                      </p>
                      <p className="serif mt-1 text-base font-semibold text-ink">
                        {x.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                        {x.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
