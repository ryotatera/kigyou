import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, findArticle } from "@/lib/articles";
import { ArticleBody } from "./ArticleBody";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/articles"
        className="mb-4 inline-flex items-center text-xs text-ink-mute hover:text-ink"
      >
        ← 記事一覧へ
      </Link>
      <p className="text-[11px] uppercase tracking-wider text-accent">
        {article.category}
      </p>
      <h1 className="serif mt-2 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-3 text-sm text-ink-mute">
        {article.author} · {article.publishedAt} · 読了 {article.readMinutes} 分
      </p>
      <div className="mt-8 border-t border-line pt-8">
        <ArticleBody article={article} />
      </div>
    </article>
  );
}
