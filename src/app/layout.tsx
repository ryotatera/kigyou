import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "起業の科学ポータル｜田所雅之と学ぶ、起業の知見",
  description:
    "起業の科学・起業大全をはじめとする 590 本以上の動画と 600 本以上の記事で、アイデア検証から PMF 達成までを体系的に学べるオンラインポータル。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&family=Noto+Serif+JP:wght@500;600;700&family=Noto+Sans+JP:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-white text-ink">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
