import Link from "next/link";
import { videos as mockVideos } from "@/lib/mockData";
import { articles } from "@/lib/articles";
import { categories } from "@/lib/categories";
import { formatNumber, formatSeconds } from "@/lib/format";
import { VideoCard } from "@/components/VideoCard";
import { Benefits } from "@/components/Benefits";
import { newsItems } from "@/lib/insights";
import { fundingsRecent, iposRecent } from "@/lib/insights-data";
import { NewsCard } from "@/components/insights/Cards";
import {
  FundingPreviewRows,
  IpoPreviewRows,
} from "@/components/insights/PreviewRows";
import { SignupLink } from "@/components/ExternalCTA";
import { fetchPreviewVideos, fetchThumbnailWall } from "@/lib/db";
import { VideoPreviewGrid } from "@/components/VideoPreviewGrid";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { FeaturedHero } from "@/components/FeaturedHero";
import { ThumbnailWall } from "@/components/ThumbnailWall";

export const revalidate = 3600;

const FAQ: { q: string; a: string }[] = [
  {
    q: "視聴方法は？",
    a: "ブラウザ（PC / スマートフォン）と、近日公開予定の iOS / Android アプリで視聴できます。動画は最初の 1 章まで誰でも無料、続きは会員限定で公開しています。",
  },
  {
    q: "料金はいくらですか？",
    a: "月額プラン ¥500 / 月、年額プラン ¥5,000 / 年（月あたり ¥417、約 17% OFF）。最初の 10 日間は無料です。",
  },
  {
    q: "入会方法は？",
    a: "メールアドレスを入力するだけで、最初の 10 日間は無料で利用開始できます。クレジットカードは無料期間終了前に登録いただければ大丈夫です。",
  },
];

export default async function HomePage() {
  const [previewVideos, wallItems] = await Promise.all([
    fetchPreviewVideos(6),
    fetchThumbnailWall(32),
  ]);
  const featured = mockVideos[0];
  // ビジュアル重視のサムネ壁: モック動画を循環させて 12 タイル
  const wall = Array.from(
    { length: 12 },
    (_, i) => mockVideos[i % mockVideos.length],
  );
  const videos = mockVideos;

  return (
    <div>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-[1.1fr_1fr] sm:py-24">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-ink-mute">
              田所雅之 / Unicorn Farm
            </p>
            <h1 className="serif text-4xl font-semibold leading-[1.12] text-ink sm:text-[56px]">
              学びを、
              <br />
              起業の現場で
              <br className="hidden sm:block" />
              武器にする。
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              アイデアの検証から PMF 達成、その先のスケールまで。
              <br className="hidden sm:block" />
              起業の科学・起業大全をはじめ <strong>354 本の動画</strong>と
              <strong>21 本の IPO レポート</strong>で、毎日の意思決定に直結する知見を学べます。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SignupLink className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark">
                10 日無料で始める
              </SignupLink>
              <Link
                href="#trial"
                className="rounded-md border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-ink/40"
              >
                お試し動画を観る
              </Link>
            </div>
            <p className="mt-3 text-xs text-ink-mute">
              クレジットカード不要 · いつでも解約可能
            </p>
          </div>

          {/* ヒーロー右側：訴求ビジュアル（書籍を読む構図のプレースホルダ） */}
          <div className="relative hidden sm:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#502952] to-[#2a2a2a] shadow-editorial">
              <div className="absolute inset-0 grid grid-cols-3 gap-1 p-6 opacity-40">
                {wall.slice(0, 9).map((v, i) => (
                  <div
                    key={i}
                    className="rounded-md"
                    style={{ background: v.posterColor }}
                  />
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6">
                <p className="serif text-2xl font-semibold leading-tight text-white">
                  起業の知見を、
                  <br />
                  毎日の意思決定に。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. サムネイルウォール（実サムネ ミックス） */}
      <section className="border-b border-line bg-ink py-16 text-paper">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-paper/60">
            Library
          </p>
          <h2 className="serif text-2xl font-semibold leading-tight sm:text-3xl">
            354 本の動画・21 本の IPO レポート・最新ニュース
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-paper/70">
            起業の科学・起業大全・ビジネスモデル解体新書・シリコンバレー情報・対談シリーズ。
            毎週、動画とレポートが追加されます。
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-6xl overflow-hidden px-6">
          {wallItems.length > 0 ? (
            <ThumbnailWall items={wallItems} />
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
              {wall.concat(wall).map((v, i) => (
                <div
                  key={i}
                  className="aspect-video overflow-hidden rounded"
                  style={{
                    background: v.posterColor,
                    opacity: 0.6 + ((i % 5) * 0.08),
                  }}
                  aria-hidden
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. ニュース — 最も目立つ位置 */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
              Insights
            </p>
            <h2 className="serif mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              起業家のためのニュース
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
              資金調達レポート、IPO レポート、最新ニュース。
              起業家・投資家が必要な情報を、一覧で素早くスキャンできます。
            </p>
            <Link
              href="/insights"
              className="mt-6 inline-block rounded-md border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/40"
            >
              すべてのニュースを見る →
            </Link>
          </div>

          {/* 資金調達 + IPO 一覧プレビュー（実データ） */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
                  資金調達（直近 3 ヶ月 {fundingsRecent.length} 件）
                </p>
                <Link
                  href="/insights/funding"
                  className="text-[11px] text-accent hover:underline"
                >
                  一覧 →
                </Link>
              </div>
              <FundingPreviewRows rows={fundingsRecent.slice(0, 6)} />
            </div>
            <div>
              <div className="mb-3 flex items-baseline justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
                  IPO（直近 3 ヶ月 {iposRecent.length} 件）
                </p>
                <Link
                  href="/insights/ipo"
                  className="text-[11px] text-accent hover:underline"
                >
                  一覧 →
                </Link>
              </div>
              <IpoPreviewRows rows={iposRecent.slice(0, 6)} />
            </div>
          </div>

          {/* ニュース（軽め） */}
          <div className="mt-14">
            <div className="mb-4 flex items-baseline justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-mute">
                最新ニュース
              </p>
              <Link
                href="/insights/news"
                className="text-[11px] text-accent hover:underline"
              >
                一覧 →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <NewsCard item={newsItems[0]} />
              <NewsCard item={newsItems[1]} />
              <NewsCard item={newsItems[2]} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. About */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
              About
            </p>
            <h2 className="serif mt-2 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              知識を、現場の意思決定に。
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <Feature
              heading="実践前提の解説"
              body="フレームワークの紹介ではなく、明日の意思決定にどう使うかを軸に解説します。"
            />
            <Feature
              heading="体系的な学習"
              body="アイデア検証から PMF、スケールまで、順を追って学べる構成です。"
            />
            <Feature
              heading="圧倒的なコスパ"
              body="書籍 20 冊分の知見を、月額 ¥500（年契約なら月あたり ¥417）で読み放題・観放題。"
            />
          </div>
        </div>
      </section>

      {/* 4. Benefits — 3 つの仕組み */}
      <Benefits />

      {/* 5. Featured — 実 YouTube 動画フック */}
      <section className="border-y border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="serif text-2xl font-semibold text-ink">注目の動画</h2>
            <Link href="/videos" className="text-xs text-accent hover:underline">
              すべての動画 →
            </Link>
          </div>
          {previewVideos.length > 0 ? (
            <FeaturedHero video={previewVideos[0]} />
          ) : (
            <Link
              href={`/videos/${featured.id}`}
              className="block overflow-hidden rounded-xl border border-line bg-white shadow-editorial transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="grid sm:grid-cols-[1.4fr_1fr]">
                <div
                  className="relative aspect-video sm:aspect-auto"
                  style={{ background: featured.posterColor }}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-ink">
                    第 1 章まるごと公開
                  </span>
                  <span className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 font-mono text-xs text-white">
                    {formatSeconds(featured.durationSeconds)}
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-[11px] uppercase tracking-wider text-ink-mute">
                    {featured.category} · {featured.speaker}
                  </p>
                  <h3 className="serif mt-1 text-2xl font-semibold leading-snug text-ink">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {featured.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-ink-mute">
                    <span>{formatNumber(featured.viewerCount)} viewed</span>
                    <span>{formatNumber(featured.saveCount)} saved</span>
                    <span className="ml-auto rounded-full bg-accent/10 px-2 py-1 text-accent">
                      最初の {Math.round(featured.previewEndSeconds / 60)} 分は無料
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* 5. お試し動画（実 DB 由来） */}
      <section id="trial" className="border-y border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
            Free Preview
          </p>
          <h2 className="serif mt-2 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            今すぐ試聴できる、実際の講義動画
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-soft">
            起業の科学・起業大全・ビジネスモデル解体新書ほか、
            複数カテゴリから人気の講義を 3 分間試聴できます。
            続きは 10 日間無料トライアルで観られます。
          </p>
          {previewVideos.length > 0 ? (
            <div className="mt-10">
              <VideoPreviewGrid videos={previewVideos} />
            </div>
          ) : (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {mockVideos.map((v) => (
                <li key={v.id}>
                  <VideoCard video={v} size="compact" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 6. 機能ショーケース（モック画面付き） */}
      <FeatureShowcase />

      {/* 7. 料金 */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">Pricing</p>
        <h2 className="serif mt-2 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          続けやすい、定額制。
        </h2>
        <p className="mt-3 text-sm text-ink-soft">
          月額プラン ¥500 / 月 · 年額プラン ¥5,000 / 年（約 17% OFF · 月あたり ¥417）
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            10 日無料で始める
          </Link>
          <Link
            href="/pricing"
            className="rounded-md border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink hover:border-ink/40"
          >
            プラン詳細を見る
          </Link>
        </div>
      </section>

      {/* 8. 専門カテゴリ */}
      <section className="border-y border-line bg-paper-warm">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-6 flex items-baseline justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
                Categories
              </p>
              <h2 className="serif mt-2 text-2xl font-semibold text-ink sm:text-3xl">
                専門カテゴリから始める
              </h2>
            </div>
            <Link href="/categories" className="text-xs text-accent hover:underline">
              すべて →
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="flex items-start gap-4 rounded-xl border border-line bg-white p-4 transition hover:border-ink/40"
                >
                  <div
                    className="h-12 w-12 shrink-0 rounded-md"
                    style={{ background: c.accent }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="serif text-base font-semibold text-ink">{c.name}</p>
                    <p className="mt-0.5 text-xs leading-snug text-ink-mute">
                      {c.tagline}
                    </p>
                    <p className="mt-1 text-[11px] text-ink-mute">
                      {c.videoCount} 本の動画
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. 最新の記事 */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
              Insights
            </p>
            <h2 className="serif mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              最新の記事
            </h2>
          </div>
          <Link href="/articles" className="text-xs text-accent hover:underline">
            すべての記事 →
          </Link>
        </div>
        <ul className="grid gap-5 sm:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <li
              key={a.slug}
              className="rounded-xl border border-line bg-white p-5 shadow-editorial transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Link href={`/articles/${a.slug}`} className="block">
                <p className="text-[10px] uppercase tracking-wider text-accent">
                  {a.category}
                </p>
                <h3 className="serif mt-1 text-lg font-semibold leading-snug text-ink">
                  {a.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {a.excerpt}
                </p>
                <p className="mt-3 text-xs text-ink-mute">
                  {a.author} · {a.publishedAt} · 読了 {a.readMinutes} 分
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 10. FAQ */}
      <section className="border-y border-line bg-paper-warm">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-ink-mute">
            FAQ
          </p>
          <h2 className="serif mt-2 text-center text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            よくある質問
          </h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {FAQ.map((f) => (
              <li key={f.q} className="py-5">
                <p className="serif text-lg font-semibold text-ink">{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-xs text-ink-mute">
            <Link href="/about" className="hover:underline">
              さらに詳しい質問はこちら →
            </Link>
          </p>
        </div>
      </section>

      {/* 11. 最終 CTA */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-paper/60">
            10 日間 無料トライアル
          </p>
          <h2 className="serif mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            今日から、学びを起業の武器に。
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/80">
            メールアドレスひとつで開始。クレジットカード不要、いつでも解約可能。
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              10 日無料で始める
            </Link>
            <Link
              href="/pricing"
              className="rounded-md border border-paper/30 bg-transparent px-6 py-3 text-sm font-semibold text-paper hover:bg-white/10"
            >
              料金を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <p className="serif text-base font-semibold text-ink">{heading}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}

