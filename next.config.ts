import type { NextConfig } from "next";

/**
 * GitHub Pages デプロイ用の静的エクスポート設定。
 * - 環境変数 `BASE_PATH`（例: "/起業の科学ポータル"）を指定するとプロジェクトページに対応。
 * - User/Org Page（<user>.github.io）や独自ドメインの場合は BASE_PATH を空のまま。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const config: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default config;
