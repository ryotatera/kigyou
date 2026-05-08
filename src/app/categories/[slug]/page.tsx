import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, findCategoryBySlug } from "@/lib/categories";
import { videos } from "@/lib/mockData";
import { VideoCard } from "@/components/VideoCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  if (!category) notFound();

  const items = videos.filter((v) => v.category === category.name);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/categories"
        className="mb-4 inline-flex items-center text-xs text-ink-mute hover:text-ink"
      >
        ← カテゴリ一覧へ
      </Link>

      <header className="mb-10 grid gap-6 sm:grid-cols-[2fr_3fr]">
        <div
          className="aspect-[2/1] rounded-xl"
          style={{ background: category.accent }}
          aria-hidden
        />
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
            Category
          </p>
          <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-1 text-sm text-ink-mute">{category.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {category.description}
          </p>
          <p className="mt-3 text-xs text-ink-mute">
            動画 {category.videoCount} 本（うち {items.length} 本のサンプルを掲載）
          </p>
        </div>
      </header>

      {items.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((v) => (
            <li key={v.id}>
              <VideoCard video={v} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-line bg-white p-12 text-center">
          <p className="text-sm text-ink-mute">
            このカテゴリの動画は近日公開予定です。
          </p>
          <Link
            href="/videos"
            className="mt-4 inline-block rounded-md bg-ink px-4 py-2 text-sm text-white"
          >
            他の動画を見る
          </Link>
        </div>
      )}
    </div>
  );
}
