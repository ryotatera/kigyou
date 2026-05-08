import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata = {
  title: "記事 | 起業の科学ポータル",
  description:
    "田所雅之による、起業の現場から抽出した観察・考察・戦略・実践のロングフォーム記事。",
};

export default function ArticlesIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
          Insights
        </p>
        <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          田所雅之の記事
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          動画ではカバーしきれない論点を、ロングフォームの記事で深堀りします。
          冒頭の数段落は誰でも読めます。続きは会員限定。
        </p>
      </header>

      <ul className="divide-y divide-line border-y border-line">
        {articles.map((a) => (
          <li key={a.slug} className="py-6">
            <Link href={`/articles/${a.slug}`} className="group block">
              <p className="text-[10px] uppercase tracking-wider text-accent">
                {a.category}
              </p>
              <h2 className="serif mt-1 text-2xl font-semibold leading-snug text-ink group-hover:underline">
                {a.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {a.excerpt}
              </p>
              <p className="mt-2 text-xs text-ink-mute">
                {a.author} · {a.publishedAt} · 読了 {a.readMinutes} 分 ·{" "}
                {a.tags.join(" / ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
