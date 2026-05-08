import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { fundingsRecent } from "@/lib/insights-data";
import { SignupLink } from "@/components/ExternalCTA";

export function generateStaticParams() {
  return fundingsRecent.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = fundingsRecent.find((x) => x.slug === slug);
  if (!r) return {};
  return {
    title: `${r.company}（${r.round || "—"}・${r.amount}）資金調達レポート | 起業の科学ポータル`,
    description: `${r.sector} / 主要投資家: ${r.investors.slice(0, 3).join(" / ")}`,
    alternates: { canonical: `/insights/funding/${r.slug}` },
  };
}

export default async function FundingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = fundingsRecent.find((x) => x.slug === slug);
  if (!r) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/insights/funding"
        className="mb-4 inline-flex items-center text-xs text-ink-mute hover:text-ink"
      >
        ← 資金調達一覧
      </Link>

      {/* 表紙 */}
      <article className="rounded-2xl border border-line bg-paper-warm shadow-editorial">
        <div className="flex items-center justify-between border-b border-line px-8 py-3 text-[11px]">
          <span className="rounded-full bg-white px-3 py-0.5 font-mono text-ink-soft">
            資金調達レポート
          </span>
          <span className="font-mono text-ink-mute">{r.date}</span>
        </div>
        <div className="px-8 py-10 sm:px-14 sm:py-12">
          <div className="flex flex-wrap gap-2">
            {r.sector ? (
              <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
                {r.sector}
              </span>
            ) : null}
            {r.round ? (
              <span className="rounded-full border border-accent/40 bg-white px-2.5 py-1 text-[11px] font-semibold text-accent">
                {r.round}
              </span>
            ) : null}
          </div>
          <h1 className="serif mt-6 text-3xl font-semibold leading-tight text-ink sm:text-[44px]">
            {r.company}
          </h1>
          {r.amount ? (
            <div className="mt-8 inline-flex items-stretch overflow-hidden rounded-md border-2 border-accent">
              <div className="flex items-center bg-accent px-6 py-4">
                <span className="serif text-3xl font-bold text-white sm:text-5xl">
                  {r.amount}
                </span>
              </div>
              <div className="flex flex-col justify-center bg-white px-4 py-2 text-xs leading-tight">
                <span className="font-medium text-ink">調達額</span>
                <span className="font-mono text-ink-mute">{r.date}</span>
              </div>
            </div>
          ) : null}
          {r.investors.length ? (
            <div className="mt-10 border-t border-line pt-6">
              <p className="text-[11px] uppercase tracking-wider text-ink-mute">
                主要投資家
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {r.investors.map((v) => (
                  <li
                    key={v}
                    className="rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>

      {/* 無料登録ゲート */}
      <SignupGate />
    </div>
  );
}

function SignupGate() {
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
          深掘りレポート（10 セクション）を無料で読む
        </h3>
        <p className="mt-3 max-w-xl text-sm text-ink-soft sm:text-base">
          会社概要・課題・ソリューション・市場・競合・評価・洞察 3 本・参照情報。
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
