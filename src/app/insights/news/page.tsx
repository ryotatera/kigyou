import Link from "next/link";
import { newsItems } from "@/lib/insights";
import { NewsCard } from "@/components/insights/Cards";

export const metadata = {
  title: "最新インサイトニュース | 起業の科学ポータル",
};

export default function NewsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/insights"
        className="mb-4 inline-flex items-center text-xs text-ink-mute hover:text-ink"
      >
        ← インサイト
      </Link>
      <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">News</p>
      <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
        最新インサイトニュース
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
        市場動向・規制・調達・M&amp;A。数値ドリブンで簡潔に毎日更新します。
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((n) => (
          <li key={n.slug}>
            <NewsCard item={n} />
          </li>
        ))}
      </ul>
    </div>
  );
}
