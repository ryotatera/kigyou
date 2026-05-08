import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, Play } from "lucide-react";
import { fetchCategories, fetchVideos } from "@/lib/db";
import { categories as mockCategories, findCategoryBySlug } from "@/lib/categories";
import { videos as mockVideos } from "@/lib/mockData";
import { VideoCard } from "@/components/VideoCard";

export const revalidate = 3600;

const COLOR_TO_BG: Record<string, string> = {
  blue: "#1F61A1",
  green: "#2E7A3D",
  red: "#A8351A",
  purple: "#5A2EA1",
  orange: "#C97A1F",
  teal: "#1F8A8A",
};
function resolveBg(color: string | null): string {
  if (!color) return "#1F2A3A";
  if (color.startsWith("#")) return color;
  return COLOR_TO_BG[color.toLowerCase()] ?? "#1F2A3A";
}

export async function generateStaticParams() {
  const dbCats = await fetchCategories();
  if (dbCats.length) return dbCats.map((c) => ({ slug: c.slug }));
  return mockCategories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbCats = await fetchCategories();
  const dbCat = dbCats.find((c) => c.slug === slug);

  if (dbCat) {
    const allVideos = await fetchVideos();
    const items = allVideos.filter((v) => v.categoryId === dbCat.id);
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
            style={{ background: resolveBg(dbCat.color) }}
            aria-hidden
          />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
              Category
            </p>
            <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              {dbCat.name}
            </h1>
            {dbCat.description ? (
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {dbCat.description}
              </p>
            ) : null}
            <p className="mt-3 text-xs text-ink-mute">{items.length} 本の動画</p>
          </div>
        </header>

        {items.length > 0 ? (
          <ul className="grid gap-3">
            {items.slice(0, 100).map((v) => (
              <li
                key={v.id}
                className="rounded-lg border border-line bg-white px-4 py-3 transition hover:bg-paper-warm"
              >
                <div className="flex items-center gap-3">
                  {v.chapter ? (
                    <span className="rounded-full bg-paper-warm px-2 py-0.5 font-mono text-[11px] text-ink-soft">
                      {v.chapter}
                      {v.step ? ` · ${v.step}` : ""}
                    </span>
                  ) : null}
                  <p className="serif flex-1 line-clamp-1 text-sm font-semibold text-ink">
                    {v.title}
                  </p>
                  <span className="font-mono text-[11px] text-ink-mute">
                    {v.duration ? `${Math.floor(v.duration / 60)}:${String(v.duration % 60).padStart(2, "0")}` : "—"}
                  </span>
                  <a
                    href="https://video-search-app-ten.vercel.app/auth/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-[11px] text-ink-soft hover:border-accent hover:text-accent"
                  >
                    <Lock className="h-3 w-3" aria-hidden /> 視聴
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <NoVideos />
        )}
        {items.length > 100 ? (
          <p className="mt-4 text-center text-xs text-ink-mute">
            上位 100 件を表示中（全 {items.length} 件）
          </p>
        ) : null}
      </div>
    );
  }

  // フォールバック: mock のカテゴリ
  const category = findCategoryBySlug(slug);
  if (!category) notFound();
  const items = mockVideos.filter((v) => v.category === category.name);

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
        <NoVideos />
      )}
    </div>
  );
}

function NoVideos() {
  return (
    <div className="rounded-xl border border-line bg-white p-12 text-center">
      <p className="text-sm text-ink-mute">
        このカテゴリの動画は近日公開予定です。
      </p>
      <Link
        href="/videos"
        className="mt-4 inline-flex items-center gap-1 rounded-md bg-ink px-4 py-2 text-sm text-white"
      >
        <Play className="h-3 w-3 fill-current" aria-hidden />
        他の動画を見る
      </Link>
    </div>
  );
}
