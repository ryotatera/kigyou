import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsItems } from "@/lib/insights";
import { fundingsRecent, iposRecent } from "@/lib/insights-data";
import { NewsCard } from "@/components/insights/Cards";
import {
  FundingPreviewRows,
  IpoPreviewRows,
} from "@/components/insights/PreviewRows";
import { SignupLink } from "@/components/ExternalCTA";

export const metadata = {
  title: "ニュース | 起業の科学ポータル",
  description:
    "資金調達一覧・IPO 一覧・最新ニュース。起業家のための一次情報を毎週配信。",
};

export default function InsightsHub() {
  const totalFunding = fundingsRecent.reduce(
    (acc, r) => acc + (r.amountValue ?? 0),
    0,
  );
  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
            News
          </p>
          <h1 className="serif mt-2 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            起業家のためのニュース
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            国内スタートアップの資金調達、IPO、市場ニュースを毎週リサーチ。
            一覧で素早くスキャンし、深掘りは無料登録でレポートを読めます。
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm sm:max-w-md">
            <Stat label="資金調達" value={String(fundingsRecent.length)} sub="件" />
            <Stat
              label="調達合計"
              value={`${Math.round(totalFunding)}`}
              sub="億円"
            />
            <Stat label="IPO" value={String(iposRecent.length)} sub="件" />
          </dl>
        </div>
      </section>

      {/* 資金調達 */}
      <Section
        eyebrow="Funding"
        title="資金調達一覧"
        description="国内スタートアップの直近 3 ヶ月の資金調達。会社・ラウンド・調達額・セクター・投資家を一覧で。"
        moreHref="/insights/funding"
        moreLabel={`全 ${fundingsRecent.length} 件を見る`}
      >
        <FundingPreviewRows rows={fundingsRecent.slice(0, 8)} />
      </Section>

      {/* IPO */}
      <Section
        eyebrow="IPO"
        title="IPO 一覧"
        description="国内テック企業の直近 3 ヶ月の上場案件。想定価格・時価総額・売上成長率を一覧で。"
        moreHref="/insights/ipo"
        moreLabel={`全 ${iposRecent.length} 件を見る`}
        background="paper-warm"
      >
        <IpoPreviewRows rows={iposRecent.slice(0, 8)} />
      </Section>

      {/* ニュース */}
      <Section
        eyebrow="News"
        title="最新ニュース"
        description="グローバルの市場動向・規制・調達ニュースを、数値とともに簡潔に。"
        moreHref="/insights/news"
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.slice(0, 6).map((n) => (
            <li key={n.slug}>
              <NewsCard item={n} />
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-line bg-ink text-paper">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="serif text-2xl font-semibold leading-tight sm:text-3xl">
            毎週、新しいニュースを。
          </h2>
          <p className="mt-3 text-sm text-paper/80">
            10 日間は無料、クレジットカード不要。
          </p>
          <SignupLink className="mt-6 inline-flex items-center gap-1 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark">
            10 日無料で始める
            <ArrowRight className="h-4 w-4" aria-hidden />
          </SignupLink>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <dt className="text-xs text-ink-mute">{label}</dt>
      <dd className="mt-1">
        <span className="serif text-2xl font-semibold text-ink">{value}</span>
        <span className="ml-1 text-xs text-ink-mute">{sub}</span>
      </dd>
    </div>
  );
}

function Section({
  eyebrow,
  title,
  description,
  moreHref,
  moreLabel = "すべて →",
  children,
  background = "paper",
}: {
  eyebrow: string;
  title: string;
  description: string;
  moreHref: string;
  moreLabel?: string;
  children: React.ReactNode;
  background?: "paper" | "paper-warm";
}) {
  const bg =
    background === "paper-warm"
      ? "bg-paper-warm border-y border-line"
      : "bg-paper";
  return (
    <section className={bg}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
              {eyebrow}
            </p>
            <h2 className="serif mt-2 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">{description}</p>
          </div>
          <Link
            href={moreHref}
            className="hidden whitespace-nowrap rounded-md border border-ink/15 bg-white px-3.5 py-1.5 text-xs font-medium text-ink hover:border-ink/40 sm:inline-block"
          >
            {moreLabel}
          </Link>
        </div>
        {children}
        <div className="mt-4 text-right sm:hidden">
          <Link href={moreHref} className="text-xs text-accent hover:underline">
            {moreLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
