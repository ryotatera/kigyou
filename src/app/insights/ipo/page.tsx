import Link from "next/link";
import { fetchIpoArticles } from "@/lib/db";
import { iposRecent } from "@/lib/insights-data";
import { IpoTable } from "@/components/insights/IpoTable";
import { LiveIpoTable } from "@/components/insights/LiveIpoTable";

export const metadata = {
  title: "IPO 一覧 | 起業の科学ポータル",
  description:
    "国内テック企業の IPO 案件を一覧で。市場・主幹事・時価総額・売上成長率で絞り込み・並び替え可能。",
};

export const revalidate = 3600;

export default async function IpoIndex() {
  const articles = await fetchIpoArticles();
  const useLive = articles.length > 0;

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
          IPO 一覧
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          直近の国内 IPO {useLive ? articles.length : iposRecent.length} 件。
          ティッカー・市場区分・上場日・梅木評価で素早くスキャン。
          深掘りレポートは無料登録で読めます。
        </p>
      </header>

      {useLive ? (
        <LiveIpoTable rows={articles} />
      ) : (
        <IpoTable rows={iposRecent} />
      )}
    </div>
  );
}
