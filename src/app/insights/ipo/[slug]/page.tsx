import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { iposRecent } from "@/lib/insights-data";
import { SignupLink } from "@/components/ExternalCTA";

export function generateStaticParams() {
  return iposRecent.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = iposRecent.find((x) => x.slug === slug);
  if (!r) return {};
  return {
    title: `${r.company} IPO レポート | 起業の科学ポータル`,
    description: `上場 ${r.ipoDate}・主幹事 ${r.lead}・時価総額 ${r.mcapOku ? `${r.mcapOku}億円` : "—"}・売上成長率 ${r.growthPct ? `+${r.growthPct}%` : "—"}`,
    alternates: { canonical: `/insights/ipo/${r.slug}` },
  };
}

export default async function IpoDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = iposRecent.find((x) => x.slug === slug);
  if (!r) notFound();

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
          <span className="font-mono text-ink-mute">上場 {r.ipoDate}</span>
        </div>
        <div className="px-8 py-10 sm:px-14 sm:py-12">
          <h1 className="serif text-3xl font-semibold leading-tight text-ink sm:text-[44px]">
            {r.company}
          </h1>
          <p className="mt-3 text-sm text-ink-mute">主幹事 {r.lead || "—"}</p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            <KV label="上場日" value={r.ipoDate} />
            <KV
              label="想定価格"
              value={r.price ? `¥${r.price.toLocaleString()}` : "—"}
              valueClass="font-mono"
            />
            <KV
              label="時価総額"
              value={r.mcapOku ? `${r.mcapOku.toFixed(1)}億円` : "—"}
              valueClass="font-mono text-accent"
            />
            <KV
              label="売上成長率"
              value={r.growthPct !== null ? `+${r.growthPct.toFixed(1)}%` : "—"}
              valueClass={
                r.growthPct !== null && r.growthPct >= 30
                  ? "font-mono text-emerald-700"
                  : "font-mono"
              }
            />
          </dl>
        </div>
      </article>

      <SignupGate />
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
      <dd className={`serif mt-1 text-base font-semibold text-ink ${valueClass ?? ""}`}>
        {value}
      </dd>
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
          会社概要・事業構造・成長戦略・財務・市場・競合・投資判断 3 本・参照情報。
          10 日間 無料、クレジットカード不要。
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
