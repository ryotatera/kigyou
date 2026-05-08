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

const COLOR_TO_BG: Record<string, string> = {
  blue: "#1F61A1",
  green: "#2E7A3D",
  red: "#A8351A",
  purple: "#5A2EA1",
  orange: "#C97A1F",
  teal: "#1F8A8A",
  amber: "#B05A1A",
  yellow: "#A88A1A",
};

function resolveColor(color: string | null): string {
  if (!color) return "#1F2A3A";
  if (color.startsWith("#")) return color;
  return COLOR_TO_BG[color.toLowerCase()] ?? "#1F2A3A";
}

export function VideoListTable({ videos, categories }: Props) {
  const [q, setQ] = useState("");
  const [catId, setCatId] = useState<string>("all");
  const [chapter, setChapter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [asc, setAsc] = useState(false);

  const catMap = useMemo(() => {
    const m = new Map<number, DbCategory>();
    categories.forEach((c) => m.set(c.id, c));
    return m;
  }, [categories]);

  const allChapters = useMemo(() => {
    const set = new Set<string>();
    videos.forEach((v) => v.chapter && set.add(v.chapter));
    return ["all", ...Array.from(set).sort()];
  }, [videos]);

  // カテゴリ別の件数（フィルタなしで）
  const countByCat = useMemo(() => {
    const m = new Map<string, number>();
    videos.forEach((v) => {
      const id = v.categoryId !== null ? String(v.categoryId) : "none";
      m.set(id, (m.get(id) ?? 0) + 1);
    });
    return m;
  }, [videos]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = videos.filter((v) => {
      if (catId !== "all") {
        const want = catId === "none" ? null : Number(catId);
        if (v.categoryId !== want) return false;
      }
      if (chapter !== "all" && v.chapter !== chapter) return false;
      if (needle) {
        const cat = v.categoryId ? catMap.get(v.categoryId)?.name ?? "" : "";
        const hay = [v.title, v.description ?? "", v.tags.join(" "), cat]
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
  }, [videos, q, catId, chapter, sort, asc, catMap]);

  const toggle = (k: SortKey) => {
    if (sort === k) setAsc((v) => !v);
    else {
      setSort(k);
      setAsc(false);
    }
  };

  return (
    <>
      {/* カテゴリチップス（タブのように切替） */}
      <div className="mb-5 -mx-1 flex flex-wrap gap-2 px-1">
        <CatChip
          label="すべて"
          count={videos.length}
          active={catId === "all"}
          onClick={() => setCatId("all")}
        />
        {categories.map((c) => {
          const n = countByCat.get(String(c.id)) ?? 0;
          if (n === 0) return null;
          return (
            <CatChip
              key={c.id}
              label={c.name}
              count={n}
              active={catId === String(c.id)}
              color={resolveColor(c.color)}
              onClick={() => setCatId(String(c.id))}
            />
          );
        })}
        {(countByCat.get("none") ?? 0) > 0 ? (
          <CatChip
            label="未分類"
            count={countByCat.get("none") ?? 0}
            active={catId === "none"}
            onClick={() => setCatId("none")}
          />
        ) : null}
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="タイトル・カテゴリ・タグで検索"
          className="rounded-md border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
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

      {/* デスクトップ：表 */}
      <div className="hidden overflow-x-auto rounded-xl border border-line bg-white shadow-editorial md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-paper-warm text-left text-xs uppercase tracking-wider text-ink-mute">
            <tr>
              <th className="px-4 py-3 font-medium">カテゴリ</th>
              <th className="px-4 py-3 font-medium">章 / STEP</th>
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
            {filtered.slice(0, 100).map((v) => {
              const cat = v.categoryId ? catMap.get(v.categoryId) : null;
              return (
                <tr key={v.id} className="transition hover:bg-paper-warm">
                  <td className="whitespace-nowrap px-4 py-3">
                    {cat ? (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white"
                        style={{ background: resolveColor(cat.color) }}
                      >
                        {cat.name}
                      </span>
                    ) : (
                      <span className="text-xs text-ink-mute">—</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-ink-mute">
                    {v.chapter ? (
                      <span>
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
              );
            })}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-ink-mute">
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
        {filtered.slice(0, 50).map((v) => {
          const cat = v.categoryId ? catMap.get(v.categoryId) : null;
          return (
            <li
              key={v.id}
              className="rounded-xl border border-line bg-white p-4 shadow-editorial"
            >
              <div className="flex flex-wrap items-baseline gap-2">
                {cat ? (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                    style={{ background: resolveColor(cat.color) }}
                  >
                    {cat.name}
                  </span>
                ) : null}
                {v.chapter ? (
                  <span className="rounded-full bg-paper-warm px-2 py-0.5 font-mono text-[10px] text-ink-soft">
                    {v.chapter}
                    {v.step ? ` · ${v.step}` : ""}
                  </span>
                ) : null}
                <span className="ml-auto font-mono text-[11px] text-ink-mute">
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
          );
        })}
      </ul>
    </>
  );
}

function CatChip({
  label,
  count,
  active,
  onClick,
  color,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition ${
        active
          ? "border-ink bg-ink text-white"
          : "border-line bg-white text-ink-soft hover:border-ink/40"
      }`}
    >
      {color ? (
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: color }}
          aria-hidden
        />
      ) : null}
      <span>{label}</span>
      <span
        className={`font-mono text-[10px] ${
          active ? "text-white/70" : "text-ink-mute"
        }`}
      >
        {count}
      </span>
    </button>
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
