import Link from "next/link";
import { iposRecent } from "@/lib/insights-data";
import { IpoTable } from "@/components/insights/IpoTable";

export const metadata = {
  title: "IPO 一覧（直近 3 ヶ月）| 起業の科学ポータル",
  description:
    "国内テック企業の上場案件を一覧で。直近 3 ヶ月、主幹事・時価総額・成長率で絞り込み・並び替え可能。",
};

export default function IpoIndex() {
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
          IPO Database
        </p>
        <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          IPO 一覧（直近 3 ヶ月）
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          2026 年 2 月〜 5 月の国内 IPO 案件 {iposRecent.length} 件。
          想定価格・時価総額・売上成長率を一覧で素早くスキャン。
          深掘りレポートは無料登録で読めます。
        </p>
      </header>

      <IpoTable rows={iposRecent} />
    </div>
  );
}
