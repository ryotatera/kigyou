import Link from "next/link";
import {
  BarChart3,
  Bookmark,
  Building2,
  Car,
  Cpu,
  Factory,
  Globe,
  HardHat,
  Leaf,
  Lock,
  Rocket,
  Shield,
  Star,
  Stethoscope,
  TrendingUp,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type {
  FundingIcon,
  FundingReport,
  IpoListing,
  NewsItem,
} from "@/lib/insights";

const FUNDING_ICONS: Record<FundingIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  lineChart: BarChart3,
  hardHat: HardHat,
  truck: Truck,
  leaf: Leaf,
  car: Car,
  cpu: Cpu,
  factory: Factory,
  rocket: Rocket,
  building: Building2,
  globe: Globe,
  shield: Shield,
};

/* ----- 共通スタイル ----- */
const CARD_BASE =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-editorial transition hover:-translate-y-0.5 hover:shadow-lg";
const HERO_BASE =
  "relative flex aspect-[16/9] items-center justify-center overflow-hidden";
const TAG_PILL =
  "rounded-full bg-paper-warm px-2 py-0.5 text-[10px] text-ink-soft";

/* ----------- Funding card（リッチ：ラウンド・投資家・日付を表示） ----------- */

export function FundingCard({ item }: { item: FundingReport }) {
  const Icon = FUNDING_ICONS[item.hero.icon];
  return (
    <Link
      href={`/insights/funding/${item.slug}`}
      className={CARD_BASE}
    >
      <div className={HERO_BASE} style={{ background: item.hero.background }}>
        <Icon
          className="h-16 w-16"
          style={{ color: item.hero.iconColor }}
          strokeWidth={1.5}
          aria-hidden
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-mono text-ink-soft">
          資金調達
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-mono text-ink-soft">
          <Star className="h-3 w-3 fill-current text-amber-500" aria-hidden />
          {item.rating}/5
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* 会社名 + 調達額 */}
        <div className="flex items-baseline justify-between gap-2">
          <p className="serif text-lg font-semibold text-ink">{item.company}</p>
          <p className="font-mono text-base font-semibold text-accent">
            {item.metric}
          </p>
        </div>

        {/* タグ */}
        <div className="mt-2 flex flex-wrap gap-1">
          {item.tags.slice(0, 4).map((t) => (
            <span key={t} className={TAG_PILL}>
              {t}
            </span>
          ))}
        </div>

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-ink-soft">
          {item.tagline}
        </p>

        {/* メタ情報グリッド */}
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
          <Meta label="ラウンド" value={item.round} />
          <Meta label="設立" value={item.founded} />
          <Meta
            label="主要投資家"
            value={item.investors.slice(0, 2).join(" / ")}
            full
          />
        </dl>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-mute">
          <span className="font-mono">{item.metricDate}</span>
          <span className="font-medium text-accent group-hover:underline">
            レポートを読む →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ----------- IPO card（リッチ：ティッカー・公開価格・初値・時価総額） ----------- */

export function IpoCard({ item }: { item: IpoListing }) {
  const Icon = FUNDING_ICONS[item.hero.icon];
  const positive = item.priceChangePct >= 0;
  return (
    <Link
      href={`/insights/ipo/${item.slug}`}
      className={CARD_BASE}
    >
      <div className={HERO_BASE} style={{ background: item.hero.background }}>
        <Icon
          className="h-16 w-16"
          style={{ color: item.hero.iconColor }}
          strokeWidth={1.5}
          aria-hidden
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-mono text-ink-soft">
          IPO
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-mono text-ink-soft">
          <Star className="h-3 w-3 fill-current text-amber-500" aria-hidden />
          {item.rating}/5
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="serif text-lg font-semibold text-ink">{item.company}</p>
          <p className="font-mono text-xs text-ink-mute">
            {item.ticker} · {item.market}
          </p>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {item.tags.slice(0, 4).map((t) => (
            <span key={t} className={TAG_PILL}>
              {t}
            </span>
          ))}
        </div>

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-ink-soft">
          {item.oneLiner}
        </p>

        {/* 公募 / 初値 / 時価総額 */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-md border border-line bg-paper-warm p-3 text-[11px]">
          <div>
            <p className="text-ink-mute">公募価格</p>
            <p className="serif mt-0.5 font-mono font-semibold text-ink">
              {item.publicPrice}
            </p>
          </div>
          <div>
            <p className="text-ink-mute">初値</p>
            <p className="serif mt-0.5 font-mono font-semibold text-ink">
              {item.openingPrice}
              <span
                className={`ml-1 text-[10px] ${
                  positive ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {positive ? "+" : ""}
                {item.priceChangePct}%
              </span>
            </p>
          </div>
          <div>
            <p className="text-ink-mute">時価総額</p>
            <p className="serif mt-0.5 font-mono font-semibold text-ink">
              {item.marketCap}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-mute">
          <span className="font-mono">上場 {item.ipoDate}</span>
          <span className="font-medium text-accent group-hover:underline">
            レポートを読む →
          </span>
        </div>
      </div>
    </Link>
  );
}

function Meta({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : undefined}>
      <dt className="text-[10px] text-ink-mute">{label}</dt>
      <dd className="truncate font-medium text-ink">{value}</dd>
    </div>
  );
}

/* ----------- News card（軽め、シンプル） ----------- */

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/insights/news/${item.slug}`} className={CARD_BASE}>
      <div
        className={HERO_BASE}
        style={{
          background:
            "linear-gradient(135deg, #F6F6F6 0%, #EFEFEF 60%, #F6F6F6 100%)",
        }}
      >
        <p
          className="serif font-bold tracking-tight text-ink"
          style={{
            fontSize: item.metric.length > 5 ? "2.4rem" : "3.4rem",
            lineHeight: 1.05,
          }}
        >
          {item.metric}
        </p>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-mono text-ink-soft">
          ニュース
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="serif line-clamp-2 min-h-[2.6rem] text-base font-semibold leading-snug text-ink">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-soft">
          {item.excerpt}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
          {item.tags.slice(0, 3).map((t) => (
            <span key={t} className={TAG_PILL}>
              {t}
            </span>
          ))}
          <span className="ml-auto font-mono text-[10px] text-ink-mute">
            {item.date}
          </span>
        </div>
      </div>
    </Link>
  );
}

export { Bookmark, Lock, Users, TrendingUp };
