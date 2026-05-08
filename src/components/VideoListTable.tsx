"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown, Lock, Play } from "lucide-react";
import type { DbCategory, DbVideo } from "@/lib/db";

type SortKey = "newest" | "views" | "title";

interface Props {
  videos: DbVideo[];
  categories: DbCategory[];
}

export function VideoListTable({ videos, categories }: Props) {
  const [q, setQ] = useState("");
  const [catId, setCatId] = useState<string>("all");
  const [chapter, setChapter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [asc, setAsc] = useState(false);

  const allChapters = useMemo(() => {
    const set = new Set<string>();
    videos.forEach((v) => v.chapter && set.add(v.chapter));
    return ["all", ...Array.from(set).sort()];
  }, [videos]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = videos.filter((v) => {
      if (catId !== "all" && String(v.categoryId ?? "") !== catId) return false;
      if (chapter !== "all" && v.chapter !== chapter) return false;
      if (needle) {
        const hay = [v.title, v.description ?? "", v.tags.join(" ")]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sort === "newest")
        cmp = (a.publishedAt ?? "").localeCompare(b.publishedAt ?? "");
      else if (sort === "views") cmp = a.viewCount - b.viewCount;
      else if (sort === "title") cmp = a.title.localeCompare(b.title);
      return asc ? cmp : -cmp;
    });
    return list;
  }, [videos, q, catId, chapter, sort, asc]);

  const toggle = (k: SortKey) => {
    if (sort === k) setAsc((v) => !v);
    else {
      setSort(k);
      setAsc(false);
    }
  };

  return (
    <>
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="タイトル・タグで検索"
          className="rounded-md border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <select
          value={catId}
          onChange={(e) => setCatId(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
        >
          <option value="all">全カテゴリ</option>
          {categories.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
        >
          {allChapters.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "全チャプター" : c}
            </option>
          ))}
        </select>
        <span className="self-center px-3 text-xs text-ink-mute">
          {filtered.length} 件
        </span>
      </div>

      <div className="hidden overflow-x-auto rounded-xl border border-line bg-white shadow-editorial md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-paper-warm text-left text-xs uppercase tracking-wider text-ink-mute">
            <tr>
              <th className="px-4 py-3 font-medium">章 / Step</th>
              <Th onClick={() => toggle("title")} active={sort === "title"} asc={asc}>
                タイトル
              </Th>
              <th className="px-4 py-3 text-right font-medium">時間</th>
              <Th onClick={() => toggle("views")} active={sort === "views"} asc={asc} align="right">
                視聴
              </Th>
              <th className="px-4 py-3 text-right font-medium">視聴</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.slice(0, 100).map((v) => (
              <tr key={v.id} className="transition hover:bg-paper-warm">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-ink-mute">
                  {v.chapter ? (
                    <span className="rounded-full bg-paper-warm px-2 py-0.5 text-ink-soft">
                      {v.chapter}
                      {v.step ? ` · ${v.step}` : ""}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="serif line-clamp-1 font-semibold text-ink">
                    {v.title}
                  </p>
                  {v.tags.length ? (
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-ink-mute">
                      {v.tags.slice(0, 4).join(" / ")}
                    </p>
                  ) : null}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs">
                  {fmtDuration(v.duration)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs text-ink-mute">
                  {v.viewCount.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <a
                    href="https://video-search-app-ten.vercel.app/auth/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-3 py-1 text-xs font-medium text-ink-soft hover:border-accent hover:text-accent"
                  >
                    <Lock className="h-3 w-3" aria-hidden />
                    視聴する
                  </a>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-ink-mute">
                  条件に一致する動画がありません。
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        {filtered.length > 100 ? (
          <p className="border-t border-line bg-paper-warm px-4 py-3 text-center text-xs text-ink-mute">
            上位 100 件を表示中（全 {filtered.length} 件）。検索／フィルタで絞り込めます。
          </p>
        ) : null}
      </div>

      {/* モバイル */}
      <ul className="space-y-3 md:hidden">
        {filtered.slice(0, 50).map((v) => (
          <li
            key={v.id}
            className="rounded-xl border border-line bg-white p-4 shadow-editorial"
          >
            <div className="flex items-baseline justify-between gap-2">
              {v.chapter ? (
                <span className="rounded-full bg-paper-warm px-2 py-0.5 font-mono text-[10px] text-ink-soft">
                  {v.chapter}
                  {v.step ? ` · ${v.step}` : ""}
                </span>
              ) : null}
              <span className="font-mono text-[11px] text-ink-mute">
                {fmtDuration(v.duration)}
              </span>
            </div>
            <p className="serif mt-2 line-clamp-2 text-sm font-semibold text-ink">
              {v.title}
            </p>
            <a
              href="https://video-search-app-ten.vercel.app/auth/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent"
            >
              <Play className="h-3 w-3" aria-hidden /> 視聴する（無料登録）
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

function fmtDuration(sec: number | null): string {
  if (!sec) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function Th({
  children,
  onClick,
  active,
  asc,
  align,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  asc: boolean;
  align?: "right";
}) {
  return (
    <th
      className={`px-4 py-3 font-medium ${align === "right" ? "text-right" : ""}`}
    >
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1 hover:text-ink ${
          active ? "text-ink" : ""
        }`}
      >
        {children}
        {active ? (
          <ChevronDown
            className={`h-3 w-3 transition ${asc ? "rotate-180" : ""}`}
            aria-hidden
          />
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" aria-hidden />
        )}
      </button>
    </th>
  );
}
