import Link from "next/link";
import { AuthBar } from "./AuthBar";
import Logo from "./Logo";

const NAV: { href: string; label: string }[] = [
  { href: "/insights", label: "ニュース" },
  { href: "/videos", label: "動画" },
  { href: "/articles", label: "記事" },
  { href: "/pricing", label: "料金" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-3">
        <Link href="/" className="flex items-center" aria-label="起業の科学ポータル トップへ">
          <Logo variant="horizontal" size={230} />
        </Link>

        <div className="ml-auto hidden items-center gap-7 md:flex">
          <nav className="flex items-center gap-6 text-sm text-ink-soft">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <span className="h-5 w-px bg-line" aria-hidden />
          <AuthBar />
        </div>

        <div className="ml-auto md:hidden">
          <AuthBar />
        </div>
      </div>
      {/* モバイル時のサブナビ */}
      <div className="border-t border-line bg-paper md:hidden">
        <nav className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-6 py-2 text-xs text-ink-soft">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="whitespace-nowrap hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
