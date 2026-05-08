import Link from "next/link";
import { fundingsRecent } from "@/lib/insights-data";
import { FundingTable } from "@/components/insights/FundingTable";

export const metadata = {
  title: "資金調達一覧（直近 3 ヶ月）| 起業の科学ポータル",
  description:
    "国内スタートアップの資金調達情報を一覧で。直近 3 ヶ月、ラウンド・セクター・調達額で絞り込み・並び替え可能。",
};

export default function FundingIndex() {
  const totalAmount = fundingsRecent.reduce(
    (acc, r) => acc + (r.amountValue ?? 0),
    0,
  );
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href="/insights"
        className="mb-4 inline-flex items-center text-xs text-ink-mute hover:text-ink"
      >
        ← ニュース
      </Link>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
          Funding Database
        </p>
        <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          資金調達一覧（直近 3 ヶ月）
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          2026 年 2 月〜 5 月、国内スタートアップの資金調達 {fundingsRecent.length} 件、
          公表合計 約 {totalAmount.toFixed(0)} 億円。
          ラウンド・セクター・投資家で絞り込めます。深掘りレポートは無料登録で読めます。
        </p>
      </header>

      <FundingTable rows={fundingsRecent} />
    </div>
  );
}
