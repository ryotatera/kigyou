import Link from "next/link";

const FOOTER: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "コンテンツ",
    links: [
      { href: "/insights", label: "インサイト" },
      { href: "/insights/funding", label: "資金調達レポート" },
      { href: "/insights/news", label: "最新ニュース" },
      { href: "/insights/ipo", label: "IPO レポート" },
      { href: "/videos", label: "動画一覧" },
      { href: "/articles", label: "記事一覧" },
      { href: "/categories", label: "カテゴリ" },
      { href: "/search", label: "検索" },
    ],
  },
  {
    heading: "メンバーシップ",
    links: [
      { href: "/pricing", label: "料金プラン" },
      { href: "/signup", label: "10 日無料で始める" },
      { href: "/login", label: "ログイン" },
      { href: "/account", label: "マイページ" },
    ],
  },
  {
    heading: "サイトについて",
    links: [
      { href: "/about", label: "起業の科学とは" },
      { href: "/about#author", label: "田所雅之について" },
      { href: "/about#terms", label: "利用規約" },
      { href: "/about#privacy", label: "プライバシー" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-warm">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-[1.4fr_3fr]">
        <div>
          <p className="serif text-xl font-semibold text-ink">起業の科学</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            起業の知見を、動画と記事で体系的に学べるポータル。
            <br />
            田所雅之と Unicorn Farm が運営しています。
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 text-sm">
          {FOOTER.map((col) => (
            <div key={col.heading}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-mute">
                {col.heading}
              </p>
              <ul className="space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-ink-soft hover:text-ink hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-ink-mute">
          © {new Date().getFullYear()} 起業の科学ポータル / Unicorn Farm
        </p>
      </div>
    </footer>
  );
}
