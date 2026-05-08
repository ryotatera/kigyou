import type { VideoCategory } from "./types";

export interface CategoryDef {
  slug: string;
  name: VideoCategory;
  tagline: string;
  description: string;
  videoCount: number;
  accent: string;
}

export const categories: CategoryDef[] = [
  {
    slug: "kigyou-no-kagaku",
    name: "起業の科学",
    tagline: "アイデア検証から PMF 達成までの体系",
    description:
      "起業初期の課題仮説検証（CPF）、解決策の妥当性（PSF）、製品の市場適合（PMF）までを 104 本の講義で順序立てて学べます。",
    videoCount: 104,
    accent: "#2A2A2A",
  },
  {
    slug: "kigyou-taizen",
    name: "起業大全",
    tagline: "競争戦略・組織・ファイナンスの全体像",
    description:
      "PMF を超えてスケールする企業に必要な、競争戦略・組織設計・資本政策の知識を 180 本で網羅。",
    videoCount: 180,
    accent: "#1F2A3A",
  },
  {
    slug: "silicon-valley",
    name: "シリコンバレー先端情報",
    tagline: "現地の最先端事例を毎週",
    description:
      "シリコンバレーのスタートアップ取材を 80 本以上。90 秒のハイライトから本編まで、最新の事業モデルを掘り下げます。",
    videoCount: 80,
    accent: "#4D2E2E",
  },
  {
    slug: "kigyou-sanbo",
    name: "起業参謀",
    tagline: "メンタリングと投資判断の現場",
    description:
      "起業家向けメンタリング・参謀役としての実例集。実際の対話と判断のプロセスを公開。",
    videoCount: 14,
    accent: "#3A2E4D",
  },
  {
    slug: "bm-kaitai",
    name: "BM 解体新書",
    tagline: "ビジネスモデルの構造を分解",
    description:
      "成功企業のビジネスモデルを構造的に分解。YouTube で公開中の人気シリーズ。",
    videoCount: 11,
    accent: "#3D2E5C",
  },
  {
    slug: "su-climbers",
    name: "SU クライマーズ",
    tagline: "急成長中の起業家ドキュメント",
    description:
      "登壇・取材で追う急成長スタートアップの素顔。導入は YouTube、本編はポータル限定。",
    videoCount: 5,
    accent: "#3A4D2E",
  },
  {
    slug: "taidan",
    name: "対談",
    tagline: "業界の第一人者との対話",
    description:
      "投資家・経営者・専門家との 25 本を超える対談シリーズ。",
    videoCount: 25,
    accent: "#2E3D4D",
  },
  {
    slug: "pitch-tettei",
    name: "ピッチ徹底検証",
    tagline: "実際のピッチを公開添削",
    description:
      "投資家視点でのピッチ添削。1 件目は誰でも観られる構成。",
    videoCount: 1,
    accent: "#4D3A2E",
  },
  {
    slug: "success-su",
    name: "成功スタートアップ解体新書",
    tagline: "成功企業の意思決定を辿る",
    description:
      "成功した日本のスタートアップを章立てで解剖。",
    videoCount: 3,
    accent: "#2E4D3A",
  },
  {
    slug: "bm-kaitai-portal",
    name: "ビジネスモデル解体新書",
    tagline: "ポータル限定のビジネスモデル分析",
    description:
      "BM 解体新書のポータル限定版。より深い分析を 18 本展開。",
    videoCount: 18,
    accent: "#4D2E3A",
  },
  {
    slug: "top-founders",
    name: "トップ起業家の素顔",
    tagline: "経営者の人物像に迫る",
    description:
      "誰もが知る起業家の意外な側面を 90 秒のハイライトで切り取ります。",
    videoCount: 2,
    accent: "#2A3A2A",
  },
];

export function findCategoryBySlug(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}

export function findCategoryByName(name: VideoCategory): CategoryDef | undefined {
  return categories.find((c) => c.name === name);
}
