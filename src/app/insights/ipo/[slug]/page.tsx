import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, Star } from "lucide-react";
import { fetchIpoArticleBySlug, fetchIpoArticles } from "@/lib/db";
import { iposRecent } from "@/lib/insights-data";
import { SignupLink } from "@/components/ExternalCTA";

export async function generateStaticParams() {
  const live = await fetchIpoArticles();
  if (live.length > 0) {
    return live.map((r) => ({ slug: r.slug }));
  }
  return iposRecent.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = await fetchIpoArticleBySlug(slug);
  if (!r) return {};
  return {
    title: `${r.companyName}（${r.ticker ?? "—"}）IPO レポート | 起業の科学ポータル`,
    description: `${r.industry ?? ""} ${r.market ?? ""} 上場 ${r.listingDate ?? "—"}`,
    alternates: { canonical: `/insights/ipo/${r.slug}` },
  };
}

interface RatingAxis {
  axis?: string;
  score?: number;
  comment?: string;
}
interface RatingBreakdown {
  total?: number;
  max?: number;
  grade?: string;
  axes?: RatingAxis[];
}

export default async function IpoDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = await fetchIpoArticleBySlug(slug);
  if (!r) {
    // フォールバック：xlsx 由来の古いデータを表示するパスがある場合
    const fallback = iposRecent.find((x) => x.slug === slug);
    if (!fallback) notFound();
    return <Fallback row={fallback} />;
  }

  const breakdown = (r.ratingBreakdown ?? null) as RatingBreakdown | null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/insights/ipo"
        className="mb-4 inline-flex items-center text-xs text-ink-mute hover:text-ink"
      >
        ← IPO 一覧
      </Link>

      <article className="rounded-2xl border border-line bg-paper-warm shadow-editorial">
        <div className="flex items-center justify-between border-b border-line px-8 py-3 text-[11px]">
          <span className="rounded-full bg-white px-3 py-0.5 font-mono text-ink-soft">
            IPO レポート
          </span>
          <span className="font-mono text-ink-mute">
            上場 {r.listingDate ?? "—"}
          </span>
        </div>

        <div className="px-8 py-10 sm:px-14 sm:py-12">
          <div className="flex flex-wrap gap-2">
            {r.industry ? (
              <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
                {r.industry}
              </span>
            ) : null}
            {r.market ? (
              <span className="rounded-full border border-accent/40 bg-white px-2.5 py-1 text-[11px] font-semibold text-accent">
                {r.market}
              </span>
            ) : null}
          </div>

          <h1 className="serif mt-6 text-3xl font-semibold leading-tight text-ink sm:text-[44px]">
            {r.companyName}
          </h1>
          {r.companyNameEn ? (
            <p className="mt-2 text-sm text-ink-mute">{r.companyNameEn}</p>
          ) : null}
          <p className="mt-1 font-mono text-xs text-ink-mute">
            ティッカー {r.ticker ?? "—"}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            <KV label="上場日" value={r.listingDate ?? "—"} />
            <KV label="市場" value={r.market ?? "—"} />
            <KV
              label="評価"
              value={
                r.ratingScore !== null ? `★ ${r.ratingScore.toFixed(1)}` : "—"
              }
              valueClass={
                r.ratingScore !== null && r.ratingScore >= 4
                  ? "text-accent"
                  : ""
              }
            />
            <KV
              label="グレード"
              value={breakdown?.grade ?? "—"}
              valueClass="font-mono"
            />
          </dl>

          {/* 8 軸スコアブレイクダウン */}
          {breakdown?.axes && breakdown.axes.length > 0 ? (
            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
                Rating Breakdown
              </p>
              <h2 className="serif mt-2 text-xl font-semibold text-ink">
                投資判断の 8 軸
              </h2>
              <ul className="mt-5 space-y-4">
                {breakdown.axes.map((a, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-line bg-white p-4"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="serif text-sm font-semibold text-ink">
                        {a.axis ?? "—"}
                      </p>
                      <span className="inline-flex items-center gap-0.5 font-mono text-xs font-semibold text-ink">
                        <Star
                          className="h-3 w-3 fill-current text-amber-500"
                          aria-hidden
                        />
                        {a.score ?? "—"}/5
                      </span>
                    </div>
                    {a.comment ? (
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                        {a.comment}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
              {breakdown.total !== undefined && breakdown.max !== undefined ? (
                <p className="mt-4 text-right font-mono text-xs text-ink-mute">
                  合計 {breakdown.total} / {breakdown.max}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>

      <SignupGate totalChars={r.totalChars} />
    </div>
  );
}

function KV({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-ink-mute">
        {label}
      </dt>
      <dd
        className={`serif mt-1 text-base font-semibold text-ink ${valueClass ?? ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

function SignupGate({ totalChars }: { totalChars: number | null }) {
  const length =
    totalChars && totalChars > 1000
      ? `本文 約 ${Math.round(totalChars / 1000)}k 文字 / 図解付き`
      : "本文 + 図解付き";
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-accent bg-paper-warm shadow-editorial">
      <div className="flex flex-col items-center px-6 py-12 text-center sm:px-14 sm:py-16">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
          <Lock className="h-6 w-6" aria-hidden />
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-accent">
          続きは無料登録で
        </p>
        <h3 className="serif mt-2 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          フルレポートを無料で読む
        </h3>
        <p className="mt-3 max-w-xl text-sm text-ink-soft sm:text-base">
          {length}。事業構造・成長戦略・財務分析・市場・競合・投資判断まで網羅。
          10 日間 無料、クレジットカード不要、いつでも解約可能。
        </p>
        <SignupLink className="mt-7 inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark">
          無料で続きを読む（10 日間 無料）
        </SignupLink>
        <p className="mt-3 text-[11px] text-ink-mute">
          すでに会員の方は{" "}
          <a
            href="https://video-search-app-ten.vercel.app/auth/login"
            className="underline"
          >
            ログイン
          </a>
        </p>
      </div>
    </div>
  );
}

function Fallback({ row }: { row: (typeof iposRecent)[number] }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/insights/ipo"
        className="mb-4 inline-flex items-center text-xs text-ink-mute hover:text-ink"
      >
        ← IPO 一覧
      </Link>
      <article className="rounded-2xl border border-line bg-paper-warm shadow-editorial">
        <div className="px-8 py-10 sm:px-14 sm:py-12">
          <h1 className="serif text-3xl font-semibold text-ink">
            {row.company}
          </h1>
          <p className="mt-2 text-sm text-ink-mute">
            上場 {row.ipoDate} · 主幹事 {row.lead}
          </p>
        </div>
      </article>
      <SignupGate totalChars={null} />
    </div>
  );
}

