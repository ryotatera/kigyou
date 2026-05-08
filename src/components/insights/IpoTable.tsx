"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown, Lock } from "lucide-react";
import type { IpoRow } from "@/lib/insights-data";

type SortKey = "date" | "mcap" | "growth" | "company";

interface Props {
  rows: IpoRow[];
}

export function IpoTable({ rows }: Props) {
  const [q, setQ] = useState("");
  const [lead, setLead] = useState("すべて");
  const [sort, setSort] = useState<SortKey>("date");
  const [asc, setAsc] = useState(false);

  const allLeads = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.lead && set.add(r.lead));
    return ["すべて", ...Array.from(set).sort()];
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = rows.filter((r) => {
      if (lead !== "すべて" && r.lead !== lead) return false;
      if (needle) {
        const hay = [r.company, r.lead].join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sort === "date") cmp = a.ipoDate.localeCompare(b.ipoDate);
      else if (sort === "mcap") cmp = (a.mcapOku ?? -1) - (b.mcapOku ?? -1);
      else if (sort === "growth")
        cmp = (a.growthPct ?? -999) - (b.growthPct ?? -999);
      else if (sort === "company") cmp = a.company.localeCompare(b.company);
      return asc ? cmp : -cmp;
    });
    return list;
  }, [rows, q, lead, sort, asc]);

  const toggleSort = (k: SortKey) => {
    if (sort === k) setAsc((v) => !v);
    else {
      setSort(k);
      setAsc(false);
    }
  };

  return (
    <>
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="会社名・主幹事で検索"
          className="rounded-md border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <select
          value={lead}
          onChange={(e) => setLead(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
          aria-label="主幹事"
        >
          {allLeads.map((l) => (
            <option key={l} value={l}>
              {l === "すべて" ? "全主幹事" : l}
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
              <Th onClick={() => toggleSort("company")} active={sort === "company"} asc={asc}>
                会社
              </Th>
              <th className="px-4 py-3 font-medium">主幹事</th>
              <th className="px-4 py-3 text-right font-medium">想定価格</th>
              <Th onClick={() => toggleSort("mcap")} active={sort === "mcap"} asc={asc} align="right">
                時価総額
              </Th>
              <Th onClick={() => toggleSort("growth")} active={sort === "growth"} asc={asc} align="right">
                売上成長率
              </Th>
              <th className="px-4 py-3 text-right font-medium">レポート</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((r) => (
              <tr key={r.slug} className="transition hover:bg-paper-warm">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-mute">
                  {r.ipoDate}
                </td>
                <td className="px-4 py-3">
                  <p className="serif font-semibold text-ink">{r.company}</p>
                </td>
                <td className="px-4 py-3 text-xs text-ink-soft">
                  {r.lead || "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs">
                  {r.price ? `¥${r.price.toLocaleString()}` : "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <span className="serif font-mono font-semibold text-accent">
                    {r.mcapOku ? `${r.mcapOku.toFixed(1)}億円` : "—"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  {r.growthPct !== null ? (
                    <span
                      className={`font-mono text-xs font-semibold ${
                        r.growthPct >= 30
                          ? "text-emerald-700"
                          : r.growthPct >= 10
                            ? "text-amber-600"
                            : "text-ink-mute"
                      }`}
                    >
                      +{r.growthPct.toFixed(1)}%
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

      {/* モバイル：カード */}
      <ul className="space-y-3 md:hidden">
        {filtered.map((r) => (
          <li
            key={r.slug}
            className="rounded-xl border border-line bg-white p-4 shadow-editorial"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="serif text-base font-semibold text-ink">{r.company}</p>
              <span className="font-mono text-xs text-ink-mute">{r.lead}</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 rounded-md border border-line bg-paper-warm p-2 text-[11px]">
              <div>
                <p className="text-ink-mute">想定価格</p>
                <p className="serif mt-0.5 font-mono font-semibold text-ink">
                  {r.price ? `¥${r.price.toLocaleString()}` : "—"}
                </p>
              </div>
              <div>
                <p className="text-ink-mute">時価総額</p>
                <p className="serif mt-0.5 font-mono font-semibold text-accent">
                  {r.mcapOku ? `${r.mcapOku.toFixed(1)}億` : "—"}
                </p>
              </div>
              <div>
                <p className="text-ink-mute">成長率</p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-emerald-700">
                  {r.growthPct !== null ? `+${r.growthPct.toFixed(1)}%` : "—"}
                </p>
              </div>
            </div>
            <p className="mt-2 font-mono text-[11px] text-ink-mute">
              上場 {r.ipoDate}
            </p>
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
