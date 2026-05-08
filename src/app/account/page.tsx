import { videos } from "@/lib/mockData";
import { articles } from "@/lib/articles";
import { AccountView } from "./AccountView";

export const metadata = {
  title: "マイページ | 起業の科学ポータル",
};

export default function AccountPage() {
  const watch = videos.slice(0, 3).map((v) => ({
    id: v.id,
    title: v.title,
    progress: 0.42,
    durationSeconds: v.durationSeconds,
    category: v.category,
  }));
  const saved = videos.slice(1, 4).map((v) => ({
    id: v.id,
    title: v.title,
    durationSeconds: v.durationSeconds,
    category: v.category,
  }));
  const recommendedArticles = articles.slice(0, 3).map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    excerpt: a.excerpt,
  }));

  return <AccountView watch={watch} saved={saved} articles={recommendedArticles} />;
}
