import Link from "next/link";
import { fetchCategories, fetchVideos } from "@/lib/db";
import { categories as mockCategories } from "@/lib/categories";

export const metadata = {
  title: "カテゴリ一覧 | 起業の科学ポータル",
};

export const revalidate = 3600;

const COLOR_TO_BG: Record<string, string> = {
  blue: "#1F61A1",
  green: "#2E7A3D",
  red: "#A8351A",
  purple: "#5A2EA1",
  orange: "#C97A1F",
  teal: "#1F8A8A",
  amber: "#B05A1A",
  yellow: "#A88A1A",
};

function resolveBg(color: string | null): string {
  if (!color) return "#1F2A3A";
  if (color.startsWith("#")) return color;
  return COLOR_TO_BG[color.toLowerCase()] ?? "#1F2A3A";
}

export default async function CategoriesIndex() {
  const [dbCategories, dbVideos] = await Promise.all([
    fetchCategories(),
    fetchVideos(),
  ]);
  const cats = dbCategories.length ? dbCategories : null;

  // カテゴリごとの動画件数
  const countByCat = new Map<number, number>();
  dbVideos.forEach((v) => {
    if (v.categoryId === null) return;
    countByCat.set(v.categoryId, (countByCat.get(v.categoryId) ?? 0) + 1);
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
          Categories
        </p>
        <h1 className="serif mt-2 text-3xl font-semibold text-ink sm:text-4xl">
          学びたいテーマから始める
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {cats ? cats.length : mockCategories.length} のカテゴリから、
          自分の今のフェーズに合った領域を選べます。
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cats
          ? cats.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="group block overflow-hidden rounded-xl border border-line bg-white shadow-editorial transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div
                    className="aspect-[2/1]"
                    style={{ background: resolveBg(c.color) }}
                    aria-hidden
                  />
                  <div className="p-5">
                    <p className="serif text-lg font-semibold text-ink group-hover:underline">
                      {c.name}
                    </p>
                    {c.description ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                        {c.description}
                      </p>
                    ) : null}
                    <p className="mt-3 text-xs font-medium text-accent">
                      {countByCat.get(c.id) ?? 0} 本の動画 →
                    </p>
                  </div>
                </Link>
              </li>
            ))
          : mockCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="group block overflow-hidden rounded-xl border border-line bg-white shadow-editorial transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div
                    className="aspect-[2/1]"
                    style={{ background: c.accent }}
                    aria-hidden
                  />
                  <div className="p-5">
                    <p className="serif text-lg font-semibold text-ink group-hover:underline">
                      {c.name}
                    </p>
                    <p className="mt-1 text-xs text-ink-mute">{c.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {c.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-accent">
                      {c.videoCount} 本の動画 →
                    </p>
                  </div>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
