"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown, Lock, Star } from "lucide-react";
import type { DbIpoArticle } from "@/lib/db";

type SortKey = "date" | "rating" | "company";

interface Props {
  rows: DbIpoArticle[];
}

export function LiveIpoTable({ rows }: Props) {
  const [q, setQ] = useState("");
  const [market, setMarket] = useState("すべて");
  const [industry, setIndustry] = useState("すべて");
  const [sort, setSort] = useState<SortKey>("date");
  const [asc, setAsc] = useState(false);

  const allMarkets = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.market && set.add(r.market));
    return ["すべて", ...Array.from(set).sort()];
  }, [rows]);

  const allIndustries = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.industry && set.add(r.industry));
    return ["すべて", ...Array.from(set).sort()];
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = rows.filter((r) => {
      if (market !== "すべて" && r.market !== market) return false;
      if (industry !== "すべて" && r.industry !== industry) return false;
      if (needle) {
        const hay = [
          r.companyName,
          r.companyNameEn ?? "",
          r.ticker ?? "",
          r.industry ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sort === "date") cmp = (a.listingDate ?? "").localeCompare(b.listingDate ?? "");
      else if (sort === "rating") cmp = (a.ratingScore ?? -1) - (b.ratingScore ?? -1);
      else if (sort === "company") cmp = a.companyName.localeCompare(b.companyName);
      return asc ? cmp : -cmp;
    });
    return list;
  }, [rows, q, market, industry, sort, asc]);

  const toggleSort = (k: SortKey) => {
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
          placeholder="会社名・ティッカー・業種で検索"
          className="rounded-md border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <select
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
          aria-label="市場"
        >
          {allMarkets.map((m) => (
            <option key={m} value={m}>
              {m === "すべて" ? "全市場" : m}
            </option>
          ))}
        </select>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
          aria-label="業種"
        >
          {allIndustries.map((m) => (
            <option key={m} value={m}>
              {m === "すべて" ? "全業種" : m}
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
              <Th onClick={() => toggleSort("date")} active={sort === "date"} asc={asc}>
                上場日
              </Th>
              <th className="px-4 py-3 font-medium">ティッカー</th>
              <Th onClick={() => toggleSort("company")} active={sort === "company"} asc={asc}>
                会社
              </Th>
              <th className="px-4 py-3 font-medium">市場</th>
              <th className="px-4 py-3 font-medium">業種</th>
              <Th onClick={() => toggleSort("rating")} active={sort === "rating"} asc={asc} align="right">
                評価
              </Th>
              <th className="px-4 py-3 text-right font-medium">レポート</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((r) => (
              <tr key={r.id} className="transition hover:bg-paper-warm">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-mute">
                  {r.listingDate ?? "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">
                  {r.ticker ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <p className="serif font-semibold text-ink">{r.companyName}</p>
                  {r.companyNameEn ? (
                    <p className="mt-0.5 text-[10px] text-ink-mute">{r.companyNameEn}</p>
                  ) : null}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-ink-soft">
                  {r.market ? (
                    <span className="rounded-full bg-paper-warm px-2 py-0.5 text-[11px]">
                      {r.market}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-ink-soft">
                  <span className="line-clamp-1">{r.industry ?? "—"}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  {r.ratingScore !== null ? (
                    <span className="inline-flex items-center gap-0.5 font-mono text-sm font-semibold text-ink">
                      <Star
                        className="h-3 w-3 fill-current text-amber-500"
                        aria-hidden
                      />
                      {r.ratingScore.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-xs text-ink-mute">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <Link
                    href={`/insights/ipo/${r.slug}`}
                    className="inline-flex items-center gap-1 rounded-md border border-line bg-white px-3 py-1 text-xs font-medium text-ink-soft hover:border-accent hover:text-accent"
                  >
                    <Lock className="h-3 w-3" aria-hidden />
                    詳細を読む
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-ink-mute">
                  条件に一致するレポートがありません。
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* モバイル */}
      <ul className="space-y-3 md:hidden">
        {filtered.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-line bg-white p-4 shadow-editorial"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="serif text-base font-semibold text-ink">
                {r.companyName}
              </p>
              <span className="font-mono text-xs text-ink-mute">{r.ticker ?? "—"}</span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">{r.industry ?? "—"}</p>
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span className="font-mono text-ink-mute">
                {r.listingDate ?? "—"}
              </span>
              {r.market ? (
                <>
                  <span>·</span>
                  <span className="rounded-full bg-paper-warm px-2 py-0.5 text-ink-soft">
                    {r.market}
                  </span>
                </>
              ) : null}
              {r.ratingScore !== null ? (
                <span className="ml-auto inline-flex items-center gap-0.5 font-mono text-xs font-semibold text-ink">
                  <Star className="h-3 w-3 fill-current text-amber-500" aria-hidden />
                  {r.ratingScore.toFixed(1)}
                </span>
              ) : null}
            </div>
            <Link
              href={`/insights/ipo/${r.slug}`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent"
            >
              <Lock className="h-3 w-3" aria-hidden /> 詳細を読む（無料登録）
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
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
