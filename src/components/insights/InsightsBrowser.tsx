"use client";

import { useMemo, useState } from "react";
import type { FundingReport, IpoListing } from "@/lib/insights";
import { FundingCard, IpoCard } from "./Cards";

type SortKey = "newest" | "amount" | "rating";

interface FundingProps {
  kind: "funding";
  items: FundingReport[];
}
interface IpoProps {
  kind: "ipo";
  items: IpoListing[];
}
type Props = FundingProps | IpoProps;

const FUNDING_ROUNDS = ["Pre-Series A", "Series A", "Series B", "Series C", "Series D"];
const IPO_MARKETS = ["プライム", "スタンダード", "グロース"];

export function InsightsBrowser(props: Props) {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState<string>("すべて");
  const [extra, setExtra] = useState<string>("すべて");
  const [sort, setSort] = useState<SortKey>("newest");

  const allSectors = useMemo(() => {
    const set = new Set<string>();
    props.items.forEach((it) => it.tags.forEach((t) => set.add(t)));
    return ["すべて", ...Array.from(set).sort()];
  }, [props.items]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list: (FundingReport | IpoListing)[] = [...props.items];

    if (needle) {
      list = list.filter((x) =>
        [
          x.company,
          x.tags.join(" "),
          "tagline" in x ? x.tagline : "",
          "oneLiner" in x ? x.oneLiner : "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      );
    }
    if (sector !== "すべて") {
      list = list.filter((x) => x.tags.includes(sector));
    }
    if (extra !== "すべて") {
      if (props.kind === "funding") {
        list = list.filter((x) => "round" in x && x.round === extra);
      } else {
        list = list.filter((x) => "market" in x && x.market === extra);
      }
    }

    list.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "newest") {
        return b.publishedAt.localeCompare(a.publishedAt);
      }
      // amount: 数字部分を取り出して比較（簡易）
      const num = (s: string) => {
        const m = s.match(/[\d.]+/);
        return m ? parseFloat(m[0]) : 0;
      };
      if (props.kind === "funding") {
        const af = a as FundingReport;
        const bf = b as FundingReport;
        return num(bf.metric) - num(af.metric);
      }
      const ai = a as IpoListing;
      const bi = b as IpoListing;
      return num(bi.marketCap) - num(ai.marketCap);
    });
    return list;
  }, [props.items, props.kind, q, sector, extra, sort]);

  const extraList = props.kind === "funding" ? FUNDING_ROUNDS : IPO_MARKETS;
  const extraLabel = props.kind === "funding" ? "ラウンド" : "市場";

  return (
    <>
      {/* フィルタバー */}
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="会社名・キーワードで検索"
          className="rounded-md border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
          aria-label="セクター"
        >
          {allSectors.map((s) => (
            <option key={s} value={s}>
              {s === "すべて" ? "全セクター" : s}
            </option>
          ))}
        </select>
        <select
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
          aria-label={extraLabel}
        >
          <option value="すべて">{`全${extraLabel}`}</option>
          {extraList.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
          aria-label="並び替え"
        >
          <option value="newest">新しい順</option>
          <option value="amount">
            {props.kind === "funding" ? "調達額順" : "時価総額順"}
          </option>
          <option value="rating">評価順</option>
        </select>
      </div>

      <p className="mb-4 text-xs text-ink-mute">{filtered.length} 件</p>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-line bg-white p-12 text-center text-sm text-ink-mute">
          条件に一致するレポートが見つかりませんでした。
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it) => (
            <li key={it.slug}>
              {props.kind === "funding" ? (
                <FundingCard item={it as FundingReport} />
              ) : (
                <IpoCard item={it as IpoListing} />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
