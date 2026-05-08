import Link from "next/link";
import { categories } from "@/lib/categories";

export const metadata = {
  title: "カテゴリ一覧 | 起業の科学ポータル",
};

export default function CategoriesIndex() {
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
          11 のカテゴリから、自分の今のフェーズに合った領域を選べます。
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
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
