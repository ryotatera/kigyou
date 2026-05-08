"use client";

import { useMemo, useState } from "react";
import type { Video } from "@/lib/types";
import { VideoCard } from "@/components/VideoCard";

interface Props {
  videos: Video[];
  categories: string[];
}

type SortKey = "popular" | "newest" | "shortest";

export function VideosBrowser({ videos, categories }: Props) {
  const [active, setActive] = useState<string>("すべて");
  const [sort, setSort] = useState<SortKey>("popular");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    let list = [...videos];
    if (active !== "すべて") list = list.filter((v) => v.category === active);
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(needle) ||
          v.description.toLowerCase().includes(needle) ||
          v.speaker.toLowerCase().includes(needle),
      );
    }
    switch (sort) {
      case "popular":
        list.sort((a, b) => b.viewerCount - a.viewerCount);
        break;
      case "newest":
        list.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "shortest":
        list.sort((a, b) => a.durationSeconds - b.durationSeconds);
        break;
    }
    return list;
  }, [videos, active, sort, q]);

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="タイトル・登壇者・キーワードで検索"
          className="w-full rounded-md border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 sm:max-w-sm"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
        >
          <option value="popular">人気順</option>
          <option value="newest">新しい順</option>
          <option value="shortest">短い順</option>
        </select>
        <p className="text-xs text-ink-mute sm:ml-auto">
          {filtered.length} 件
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              active === c
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink-soft hover:border-ink/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-line bg-white p-12 text-center text-sm text-ink-mute">
          条件に一致する動画が見つかりませんでした。
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <li key={v.id}>
              <VideoCard video={v} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
