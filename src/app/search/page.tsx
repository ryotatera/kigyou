import { videos } from "@/lib/mockData";
import { articles } from "@/lib/articles";
import { SearchClient } from "./SearchClient";

export const metadata = {
  title: "検索 | 起業の科学ポータル",
};

export default function SearchPage() {
  // Server で全データを serialize して渡す（プロト用に十分なサイズ）
  const articleStubs = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    publishedAt: a.publishedAt,
  }));
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">Search</p>
      <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
        動画と記事をまとめて検索
      </h1>
      <SearchClient videos={videos} articles={articleStubs} />
    </div>
  );
}
