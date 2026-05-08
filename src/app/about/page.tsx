import Link from "next/link";

export const metadata = {
  title: "サイトについて | 起業の科学ポータル",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">About</p>
      <h1 className="serif mt-2 text-4xl font-semibold leading-tight text-ink">
        起業の科学ポータル とは
      </h1>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        起業の科学ポータルは、起業家・新規事業担当者・投資家が、
        体系的に起業の知見を学べるオンライン学習サービスです。
        書籍『起業の科学』『起業大全』を起点に、現場の意思決定に直結する
        動画と記事を毎週更新しています。
      </p>

      <section id="author" className="mt-12 scroll-mt-24">
        <h2 className="serif text-2xl font-semibold text-ink">田所雅之 について</h2>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          スタートアップの起業家・経営者・投資家。
          『起業の科学』『起業大全』など、起業領域の体系書を多数執筆。
          国内外のスタートアップへのメンタリング・投資を通じて、
          理論と現場の往復から学びを抽出してきました。
        </p>
      </section>

      <section className="mt-12">
        <h2 className="serif text-2xl font-semibold text-ink">3 つの特徴</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          <Feature
            heading="実践前提の解説"
            body="知識の紹介ではなく、明日からの意思決定にどう使うかを軸に解説します。"
          />
          <Feature
            heading="体系的な学習"
            body="アイデアの検証から PMF、その先のスケールまで、順を追って学べます。"
          />
          <Feature
            heading="毎週の更新"
            body="シリコンバレーや国内の最新事例を、毎週新しい動画と記事で届けます。"
          />
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="serif text-2xl font-semibold text-ink">ご利用について</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
          <li>
            ・最初の 10 日間は無料です。クレジットカードは不要、いつでも解約可能です。
          </li>
          <li>
            ・対応デバイス: PC ブラウザ / スマートフォンブラウザ / iOS・Android アプリ
          </li>
          <li>
            ・推奨環境: 最新版の Chrome / Safari / Edge
          </li>
        </ul>
        <div className="mt-5">
          <Link
            href="/signup"
            className="inline-block rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            10 日無料で始める
          </Link>
        </div>
      </section>

      <section id="terms" className="mt-12 scroll-mt-24 border-t border-line pt-8">
        <h2 className="serif text-2xl font-semibold text-ink">利用規約</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          本サービスのご利用には利用規約への同意が必要です。
          利用規約の全文は、別途公開する正式版をご確認ください。
        </p>
      </section>

      <section id="privacy" className="mt-12 scroll-mt-24 border-t border-line pt-8">
        <h2 className="serif text-2xl font-semibold text-ink">プライバシー</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          ご登録いただいた情報は、サービス提供と改善の目的にのみ利用します。
          第三者への提供は、法令に基づく場合を除き行いません。
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="serif text-2xl font-semibold text-ink">お問い合わせ</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          ご質問・取材依頼・法人プランのご相談は、
          <a className="text-accent underline" href="mailto:hello@example.com">
            hello@example.com
          </a>
          までご連絡ください。
        </p>
      </section>
    </article>
  );
}

function Feature({ heading, body }: { heading: string; body: string }) {
  return (
    <li className="rounded-xl border border-line bg-white p-5">
      <p className="serif text-base font-semibold text-ink">{heading}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
    </li>
  );
}
