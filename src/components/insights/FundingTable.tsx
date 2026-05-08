"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown, Lock } from "lucide-react";
import type { FundingRow } from "@/lib/insights-data";

type SortKey = "date" | "amount" | "company";

interface Props {
  rows: FundingRow[];
}

export function FundingTable({ rows }: Props) {
  const [q, setQ] = useState("");
  const [round, setRound] = useState("すべて");
  const [sort, setSort] = useState<SortKey>("date");
  const [asc, setAsc] = useState(false);

  const allRounds = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.round && set.add(r.round));
    return ["すべて", ...Array.from(set).sort()];
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = rows.filter((r) => {
      if (round !== "すべて" && r.round !== round) return false;
      if (needle) {
        const hay = [r.company, r.sector, r.investors.join(" ")]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sort === "date") cmp = a.date.localeCompare(b.date);
      else if (sort === "amount")
        cmp = (a.amountValue ?? -1) - (b.amountValue ?? -1);
      else if (sort === "company") cmp = a.company.localeCompare(b.company);
      return asc ? cmp : -cmp;
    });
    return list;
  }, [rows, q, round, sort, asc]);

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
          placeholder="会社名・セクター・投資家で検索"
          className="rounded-md border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <select
          value={round}
          onChange={(e) => setRound(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
          aria-label="ラウンド"
        >
          {allRounds.map((r) => (
            <option key={r} value={r}>
              {r === "すべて" ? "全ラウンド" : r}
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
                公開日
              </Th>
              <Th onClick={() => toggleSort("company")} active={sort === "company"} asc={asc}>
                会社
              </Th>
              <th className="px-4 py-3 font-medium">セクター</th>
              <th className="px-4 py-3 font-medium">ラウンド</th>
              <Th onClick={() => toggleSort("amount")} active={sort === "amount"} asc={asc} align="right">
                調達額
              </Th>
              <th className="px-4 py-3 font-medium">主要投資家</th>
              <th className="px-4 py-3 text-right font-medium">レポート</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((r) => (
              <tr key={r.slug} className="transition hover:bg-paper-warm">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-mute">
                  {r.date}
                </td>
                <td className="px-4 py-3">
                  <p className="serif font-semibold text-ink">{r.company}</p>
                </td>
                <td className="px-4 py-3 text-xs text-ink-soft">{r.sector}</td>
                <td className="px-4 py-3">
                  {r.round ? (
                    <span className="rounded-full bg-paper-warm px-2 py-0.5 text-[11px] text-ink-soft">
                      {r.round}
                    </span>
                  ) : (
                    <span className="text-xs text-ink-mute">—</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <span className="serif font-mono font-semibold text-accent">
                    {r.amount || "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-ink-soft">
                  <span className="line-clamp-1">
                    {r.investors.slice(0, 3).join(" / ")}
                    {r.investors.length > 3
                      ? ` 他${r.investors.length - 3}社`
                      : ""}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <Link
                    href={`/insights/funding/${r.slug}`}
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
              <span className="font-mono text-sm font-semibold text-accent">
                {r.amount || "—"}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">{r.sector}</p>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-ink-mute">
              <span className="font-mono">{r.date}</span>
              {r.round ? (
                <>
                  <span>·</span>
                  <span className="rounded-full bg-paper-warm px-2 py-0.5 text-ink-soft">
                    {r.round}
                  </span>
                </>
              ) : null}
            </div>
            <p className="mt-2 line-clamp-2 text-xs text-ink-soft">
              {r.investors.join(" / ")}
            </p>
            <Link
              href={`/insights/funding/${r.slug}`}
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
