import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  ListChecks,
  PenLine,
  Play,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

/**
 * プロダクトの主要機能を、ライブモックアップ付きで紹介するセクション。
 * 4 つのキー機能 × 軽量モック画面で、登録前に「中身が想像できる」ようにする。
 */
export function FeatureShowcase() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-mute">
            Inside the Portal
          </p>
          <h2 className="serif mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            会員ページの中身を、
            <br className="hidden sm:block" />
            <span className="text-accent">登録前に</span>のぞいてみる
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            動画ライブラリ・マイカリキュラム・インサイト記事・視聴履歴。
            実際に会員になった後の体験を、4 つの画面で紹介します。
          </p>
        </div>

        <div className="mt-16 space-y-20">
          <FeatureRow
            number="01"
            title="動画ライブラリ"
            subtitle="354 本の講義から、今のあなたに必要な動画を即発見。"
            description="起業の科学・起業大全・ビジネスモデル解体新書 など 9 カテゴリ・354 本の動画を、章/Step・キーワード・タグで素早く絞り込めます。"
            mockup={<LibraryMockup />}
            mockupSide="right"
          />
          <FeatureRow
            number="02"
            title="マイカリキュラム"
            subtitle="今のフェーズに合った学習パスを自動生成。"
            description="アイデア検証・PSF・PMF・スケール — 自分のステージに応じて、AI が次に観るべき動画とその順序を提案。チェックボックスで進捗管理。"
            mockup={<CurriculumMockup />}
            mockupSide="left"
          />
          <FeatureRow
            number="03"
            title="インサイト記事"
            subtitle="資金調達・IPO・市場動向を毎週 30 本以上。"
            description="国内 IPO レポート（21 本）・資金調達分析・グローバル市場の動きを、起業家視点で深掘り。動画と相互リンクで判断軸が育つ。"
            mockup={<InsightMockup />}
            mockupSide="right"
          />
          <FeatureRow
            number="04"
            title="マイメモ・ブックマーク"
            subtitle="学びを行動に変える、自分専用ノート。"
            description="動画の特定の秒数にメモを残せる。気になる動画・記事はワンタップで保存。視聴履歴と組み合わせて、振り返りが習慣化する。"
            mockup={<NoteMockup />}
            mockupSide="left"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  number,
  title,
  subtitle,
  description,
  mockup,
  mockupSide,
}: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  mockup: React.ReactNode;
  mockupSide: "left" | "right";
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={mockupSide === "left" ? "lg:order-2" : "lg:order-1"}>
        <p className="font-mono text-xs tracking-wider text-ink-mute">
          Feature {number}
        </p>
        <h3 className="serif mt-2 text-3xl font-semibold leading-[1.2] text-ink sm:text-[34px]">
          {title}
        </h3>
        <p className="mt-3 serif text-base font-medium text-accent">
          {subtitle}
        </p>
        <p className="mt-4 text-base leading-[1.85] text-ink-soft">
          {description}
        </p>
      </div>
      <div className={mockupSide === "left" ? "lg:order-1" : "lg:order-2"}>
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-paper-warm to-paper" />
          <div className="overflow-hidden rounded-xl border border-line bg-white shadow-editorial">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 border-b border-line bg-paper-warm px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-[11px] text-ink-mute">
                kigyou.example / {title}
              </span>
            </div>
            {mockup}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mockup 1: Library ---------- */

function LibraryMockup() {
  const items = [
    { ch: "ch1 · 1-1", title: "起業の科学 新装版とは", views: 653 },
    { ch: "ch1 · 1-1", title: "スタートアップの成功の定義とは", views: 169 },
    { ch: "ch1 · 1-1", title: "スタートアップの良いアイディアとは", views: 124 },
    { ch: "ch4 · 4-3", title: "偽りのシグナルに惑わされない", views: 96 },
    { ch: "ch1 · 1-1", title: "BigTech / 大企業の失敗事例", views: 88 },
  ];
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center gap-2 rounded-md border border-line bg-paper-warm px-3 py-2 text-xs">
        <Search className="h-3.5 w-3.5 text-ink-mute" aria-hidden />
        <span className="text-ink-mute">PMF / カスタマーインタビュー</span>
        <span className="ml-auto rounded-full bg-white px-2 py-0.5 font-mono text-[10px] text-ink-soft">
          全 354 本
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-md border border-line bg-white px-3 py-2 text-xs"
          >
            <span className="rounded-full bg-paper-warm px-2 py-0.5 font-mono text-[10px] text-ink-soft">
              {it.ch}
            </span>
            <p className="serif flex-1 truncate font-semibold text-ink">
              {it.title}
            </p>
            <span className="font-mono text-[10px] text-ink-mute">
              👁 {it.views}
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
              <Play className="h-3 w-3 fill-current" aria-hidden />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Mockup 2: Curriculum ---------- */

function CurriculumMockup() {
  const steps = [
    { name: "アイデアの検証", count: "14 / 14 本", done: true, progress: 100 },
    { name: "課題仮説の構築", count: "8 / 8 本", done: true, progress: 100 },
    { name: "プロブレムインタビュー", count: "3 / 5 本", done: false, progress: 60 },
    { name: "MVP 構築", count: "0 / 6 本", done: false, progress: 0 },
    { name: "PMF 達成検証", count: "—", done: false, progress: 0 },
  ];
  return (
    <div className="p-5">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-ink-mute">あなたの学習パス</p>
          <p className="serif mt-0.5 text-base font-semibold text-ink">
            アイデア検証 → PMF 達成
          </p>
        </div>
        <div className="text-right text-[11px]">
          <p className="text-ink-mute">完了</p>
          <p className="serif font-mono text-2xl font-semibold text-accent">
            22<span className="text-base text-ink-mute">/40</span>
          </p>
        </div>
      </div>
      <ul className="space-y-2.5">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-3">
            {s.done ? (
              <CheckCircle2
                className="h-5 w-5 shrink-0 text-accent"
                aria-hidden
              />
            ) : (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-line bg-white font-mono text-[10px] text-ink-mute">
                {i + 1}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p
                  className={`text-xs font-medium ${
                    s.progress > 0 ? "text-ink" : "text-ink-mute"
                  }`}
                >
                  {s.name}
                </p>
                <span className="font-mono text-[10px] text-ink-mute">
                  {s.count}
                </span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-paper-warm">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${s.progress}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Mockup 3: Insight Article ---------- */

function InsightMockup() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 text-[10px]">
        <span className="rounded-full bg-accent px-2 py-0.5 font-semibold text-white">
          B2B SaaS
        </span>
        <span className="rounded-full border border-accent/40 bg-white px-2 py-0.5 font-semibold text-accent">
          グロース
        </span>
        <span className="ml-auto font-mono text-ink-mute">2026-04-21</span>
      </div>
      <p className="serif mt-3 text-lg font-semibold leading-snug text-ink">
        バトンズ（554A）IPO レポート
      </p>
      <p className="mt-1 text-[11px] text-ink-mute">
        評価 ★ 3.8 / グレード A-
      </p>

      <div className="mt-4 space-y-2">
        <RatingAxis name="Founder-Market Fit" score={4} />
        <RatingAxis name="市場性" score={5} />
        <RatingAxis name="プロダクト" score={4} />
        <RatingAxis name="Unit Economics" score={3} />
        <RatingAxis name="MOAT" score={4} />
      </div>

      <div className="mt-4 rounded-md border border-line bg-paper-warm px-3 py-2 text-[11px] leading-relaxed text-ink-soft">
        <Sparkles
          className="mr-1 inline-block h-3 w-3 text-accent"
          aria-hidden
        />
        60 歳以上経営者 245 万人・後継者不在率 65% の不可逆メガトレンド。
        Two-sided ネットワーク効果が稼働中。
      </div>
    </div>
  );
}

function RatingAxis({ name, score }: { name: string; score: number }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <p className="w-32 shrink-0 text-ink-soft">{name}</p>
      <div className="flex flex-1 gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < score ? "bg-accent" : "bg-paper-warm"
            }`}
          />
        ))}
      </div>
      <span className="w-8 text-right font-mono font-semibold text-ink">
        {score}/5
      </span>
    </div>
  );
}

/* ---------- Mockup 4: Notes ---------- */

function NoteMockup() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 border-b border-line pb-2 text-[11px]">
        <BookOpen className="h-3.5 w-3.5 text-accent" aria-hidden />
        <span className="text-ink-mute">PMFを達成できたか？再現性があるか？</span>
        <span className="ml-auto font-mono text-ink-mute">04:23 / 12:08</span>
      </div>

      <ul className="mt-3 space-y-2">
        {[
          {
            time: "01:24",
            note: "顧客が「金払ってでも使いたい」と言うこと → PMF の最初のシグナル",
            kind: "メモ",
            icon: PenLine,
          },
          {
            time: "03:41",
            note: "再訪率＞ 40% を 30 日連続で維持できるか",
            kind: "メモ",
            icon: PenLine,
          },
          {
            time: "08:52",
            note: "観たい：MVP 構築の章で同じ事例が出る",
            kind: "ブックマーク",
            icon: Bookmark,
          },
        ].map((n, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-md border border-line bg-paper-warm px-3 py-2 text-xs"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-accent">
              <n.icon className="h-3 w-3" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="font-mono font-semibold text-accent">
                  {n.time}
                </span>
                <span className="rounded-full bg-white px-1.5 py-0.5 text-[9px] text-ink-mute">
                  {n.kind}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] leading-snug text-ink">
                {n.note}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center gap-2 border-t border-line pt-2 text-[10px] text-ink-mute">
        <Users className="h-3 w-3" aria-hidden />
        <span>視聴履歴 12 / 今月</span>
        <span>·</span>
        <ListChecks className="h-3 w-3" aria-hidden />
        <span>メモ 38 件</span>
      </div>
    </div>
  );
}
