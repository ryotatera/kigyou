import Link from "next/link";
import { notFound } from "next/navigation";
import { newsItems } from "@/lib/insights";

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | 起業の科学ポータル`,
    description: item.excerpt,
    openGraph: { title: item.title, description: item.excerpt, type: "article" },
  };
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/insights/news"
        className="mb-4 inline-flex items-center text-xs text-ink-mute hover:text-ink"
      >
        ← 最新インサイトニュース
      </Link>
      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        {item.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-paper-warm px-2.5 py-0.5 text-ink-soft"
          >
            {t}
          </span>
        ))}
        <span className="font-mono text-ink-mute">{item.date}</span>
      </div>
      <h1 className="serif mt-3 text-3xl font-semibold leading-tight text-ink sm:text-[40px]">
        {item.title}
      </h1>
      <div
        className="mt-6 flex aspect-[16/9] items-center justify-center rounded-xl"
        style={{ background: item.background }}
      >
        <p
          className="serif font-semibold"
          style={{
            color: item.metricColor,
            fontSize: item.metric.length > 5 ? "3rem" : "5rem",
            lineHeight: 1,
          }}
        >
          {item.metric}
        </p>
      </div>
      <div className="mt-8 space-y-5 text-base leading-[1.85] text-ink">
        {item.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <SoftCta />
    </article>
  );
}

function SoftCta() {
  return (
    <div className="mt-12 rounded-xl border border-line bg-paper-warm p-6 text-center">
      <p className="serif text-lg font-semibold text-ink">
        起業の科学ポータルで、もっと深く学ぶ
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        300+ 本の動画と 150+ 本のレポートで、明日の意思決定を変える。
      </p>
      <Link
        href="/pricing"
        className="mt-4 inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
      >
        ¥500 / 月で始める
      </Link>
    </div>
  );
}
