import Link from "next/link";

export const metadata = {
  title: "料金 | 起業の科学ポータル",
  description:
    "月額・年額プランと 10 日間無料トライアル。クレジットカード不要で開始できます。",
};

const features = [
  "590 本以上の動画 見放題",
  "600 本以上の記事 読み放題",
  "新着コンテンツの即時配信",
  "視聴履歴・しおり・続きから再生",
  "保存した動画のオフライン視聴",
  "新書発売前の特別公開",
];

const faq = [
  {
    q: "10 日間の無料トライアルとは？",
    a: "メールアドレスのみで開始でき、最初の 10 日間はすべての動画と記事を無料で視聴できます。クレジットカード不要、期間中いつでも解約可能です。",
  },
  {
    q: "支払い方法は？",
    a: "クレジットカード（Visa / Master / JCB / AMEX）に対応しています。法人払いをご希望の方はお問い合わせください。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい、マイページから 1 クリックで解約可能です。解約後も次回更新日まではすべての機能を引き続きご利用いただけます。",
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
            Pricing
          </p>
          <h1 className="serif mt-3 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            学び続けやすい、定額制。
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            10 日間は無料。クレジットカード不要、いつでも解約可能。
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-4xl px-6 pb-16">
        <div className="grid gap-5 sm:grid-cols-2">
          <PlanCard
            name="月額プラン"
            price="¥500"
            unit="/ 月"
            highlight={false}
            note="まずは試したい方に"
            cta="月額で始める"
          />
          <PlanCard
            name="年額プラン"
            price="¥5,000"
            unit="/ 年"
            highlight
            note="月あたり ¥417 · 約 17% OFF"
            cta="年額で始める"
          />
        </div>

        <div className="mt-10 rounded-xl border border-line bg-white p-6 shadow-editorial sm:p-8">
          <h2 className="serif text-xl font-semibold text-ink">含まれる機能</h2>
          <ul className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-accent">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-paper-warm">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="serif text-center text-2xl font-semibold text-ink sm:text-3xl">
            よくある質問
          </h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {faq.map((f) => (
              <li key={f.q} className="py-5">
                <p className="serif text-lg font-semibold text-ink">{f.q}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="/signup"
              className="inline-block rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              10 日無料で始める
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PlanCard({
  name,
  price,
  unit,
  highlight,
  note,
  cta,
}: {
  name: string;
  price: string;
  unit: string;
  highlight: boolean;
  note: string;
  cta: string;
}) {
  return (
    <div
      className={`rounded-xl border bg-white p-6 shadow-editorial sm:p-8 ${
        highlight ? "border-accent ring-2 ring-accent/30" : "border-line"
      }`}
    >
      {highlight ? (
        <p className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
          おすすめ
        </p>
      ) : null}
      <p className="serif text-xl font-semibold text-ink">{name}</p>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="serif text-4xl font-semibold text-ink">{price}</span>
        <span className="text-sm text-ink-mute">{unit}</span>
      </div>
      <p className="mt-1 text-xs text-ink-mute">{note}</p>
      <Link
        href="/signup"
        className={`mt-5 block w-full rounded-md py-3 text-center text-sm font-semibold ${
          highlight
            ? "bg-accent text-white hover:bg-accent-dark"
            : "border border-ink/15 bg-white text-ink hover:border-ink/40"
        }`}
      >
        {cta}
      </Link>
      <p className="mt-3 text-center text-[11px] text-ink-mute">
        最初の 10 日間は無料 / カード不要
      </p>
    </div>
  );
}
