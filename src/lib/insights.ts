/* インサイト系コンテンツのモックデータ
 * 2 カテゴリ：資金調達レポート（funding）/ IPO レポート（ipo）/ ニュース（news）
 * 一覧は SEO 公開（フィルタ・検索可能）、詳細レポートは無料登録ゲート
 */

export type FundingIcon =
  | "stethoscope"
  | "lineChart"
  | "hardHat"
  | "truck"
  | "leaf"
  | "car"
  | "cpu"
  | "factory"
  | "rocket"
  | "building"
  | "globe"
  | "shield";

export interface ReportSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  body: string[];
}

/* ============== 資金調達レポート ============== */

export interface FundingReport {
  slug: string;
  company: string;
  tagline: string;
  oneLiner: string;
  tags: string[]; // セクター
  round: string; // Pre-Series A / Series A / etc
  metric: string; // ¥5億
  metricLabel: string;
  metricDate: string;
  hero: { background: string; icon: FundingIcon; iconColor: string };
  founded: string;
  investors: string[];
  rating: 1 | 2 | 3 | 4 | 5;
  publishedAt: string;
  sections: ReportSection[];
}

const placeholderBody = (sectionTitle: string): string[] => [
  `${sectionTitle}に関する分析。市場規模・成長率・主要プレイヤー・リスク要因を整理しています。`,
  "本セクションでは一次情報をベースに、定量・定性両面から評価を加えています。",
];

const flora_body = (n: number): string[] => {
  const map: Record<number, string[]> = {
    1: [
      "Flora は京都大学発のフェムテックスタートアップ。創業者は京大在学中に Forbes 30 Under 30 に選出された。",
      "経営チームには元グローバル製薬で女性ヘルスケア事業を率いた幹部、京大医学研究科の研究者が参画。アカデミアと事業開発の往復ができる構成が特徴。",
    ],
    2: [
      "女性特有の症状による経済損失は年間 5.4 兆円規模と推計され、月経・PMS・更年期に関する休職・離職コストはとくに大きい。",
      "一方で女性の身体に関する臨床データは欧米中心で、日本人女性のデータが圧倒的に不足する「ジェンダーデータギャップ」が存在。",
    ],
    3: [
      "Flora は 20 万人規模の月次トラッキングデータと、医療機関連携による検査データを統合。3 つの事業が相互に連携するエコシステムを構築している。",
    ],
  };
  return map[n] ?? placeholderBody("分析");
};

const make10Sections = (titles: string[], bodyFn?: (i: number) => string[]) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1).padStart(2, "0"),
    number: String(i + 1).padStart(2, "0"),
    title: titles[i],
    summary: "",
    body: bodyFn ? bodyFn(i + 1) : placeholderBody(titles[i]),
  }));

const sectionTitlesFunding = [
  "会社概要",
  "課題",
  "ソリューション",
  "市場",
  "競合分析",
  "評価サマリ",
  "洞察 1/3",
  "洞察 2/3",
  "洞察 3/3",
  "参照情報",
];

export const fundingReports: FundingReport[] = [
  {
    slug: "flora-femtech",
    company: "Flora",
    tagline: "データと AI で女性の健康を可視化する京都発フェムテック",
    oneLiner: "立命館 SIF・長瀬産業 CVC が参画、累計 5 億円調達",
    tags: ["FemTech", "HealthTech", "SaaS", "AI/ML"],
    round: "Pre-Series B",
    metric: "5億円",
    metricLabel: "累計調達額",
    metricDate: "2026-04-27",
    hero: { background: "#FFF6E8", icon: "stethoscope", iconColor: "#C97A1F" },
    founded: "2022",
    investors: ["立命館 SIF", "長瀬産業 CVC", "京都大学イノベーションキャピタル"],
    rating: 5,
    publishedAt: "2026-04-27",
    sections: make10Sections(sectionTitlesFunding, flora_body),
  },
  {
    slug: "qubiscore",
    company: "QubiScore",
    tagline: "B2B 与信データを AI で再構築する SaaS",
    oneLiner: "Pre-Series A で 8 億円調達、PMF 加速",
    tags: ["FinTech", "SaaS", "B2B", "AI/ML"],
    round: "Pre-Series A",
    metric: "8億円",
    metricLabel: "Pre-Series A",
    metricDate: "2026-04-12",
    hero: { background: "#EDE7FF", icon: "lineChart", iconColor: "#5A2EA1" },
    founded: "2021",
    investors: ["JIC VGI", "ANRI", "DG Daiwa Ventures"],
    rating: 4,
    publishedAt: "2026-04-12",
    sections: make10Sections(sectionTitlesFunding),
  },
  {
    slug: "ala",
    company: "AlA",
    tagline: "建設現場の AI 検査プラットフォーム",
    oneLiner: "Series B 12 億円、大手ゼネコン 3 社が出資",
    tags: ["ConstructionTech", "AI/ML", "SaaS"],
    round: "Series B",
    metric: "12億円",
    metricLabel: "Series B",
    metricDate: "2026-04-03",
    hero: { background: "#FFE6D6", icon: "hardHat", iconColor: "#B05A1A" },
    founded: "2019",
    investors: ["大成建設", "鹿島建設", "竹中工務店", "JAFCO"],
    rating: 4,
    publishedAt: "2026-04-03",
    sections: make10Sections(sectionTitlesFunding),
  },
  {
    slug: "cbcloud",
    company: "CBcloud",
    tagline: "ラストマイル物流のデジタル化",
    oneLiner: "Series D 累計 50 億円、海外展開へ",
    tags: ["LogiTech", "Mobility", "B2B"],
    round: "Series D",
    metric: "50億円",
    metricLabel: "累計調達額",
    metricDate: "2026-03-21",
    hero: { background: "#DEF0FF", icon: "truck", iconColor: "#1F61A1" },
    founded: "2013",
    investors: ["三井物産", "みずほキャピタル", "WiL"],
    rating: 4,
    publishedAt: "2026-03-21",
    sections: make10Sections(sectionTitlesFunding),
  },
  {
    slug: "amibox",
    company: "amibox",
    tagline: "サステナブル EC の梱包プラットフォーム",
    oneLiner: "Series A 4 億円、月次 GMV 30% 成長",
    tags: ["Climate", "EC", "Sustainability"],
    round: "Series A",
    metric: "4億円",
    metricLabel: "Series A",
    metricDate: "2026-03-15",
    hero: { background: "#E2F4DC", icon: "leaf", iconColor: "#2E7A3D" },
    founded: "2021",
    investors: ["Globis Capital Partners", "デライト・ベンチャーズ"],
    rating: 3,
    publishedAt: "2026-03-15",
    sections: make10Sections(sectionTitlesFunding),
  },
  {
    slug: "mota",
    company: "MOTA",
    tagline: "中古車サブスクの DX",
    oneLiner: "シリーズ A 7 億円調達、若年層シェア急拡大",
    tags: ["Mobility", "Subscription", "B2C"],
    round: "Series A",
    metric: "7億円",
    metricLabel: "Series A",
    metricDate: "2026-03-02",
    hero: { background: "#FFE7E0", icon: "car", iconColor: "#A8351A" },
    founded: "2020",
    investors: ["三井住友海上キャピタル", "SBI Investment"],
    rating: 3,
    publishedAt: "2026-03-02",
    sections: make10Sections(sectionTitlesFunding),
  },
];

export function findFundingReport(slug: string): FundingReport | undefined {
  return fundingReports.find((f) => f.slug === slug);
}

/* ============== IPO レポート ============== */

export type IpoMarket = "プライム" | "スタンダード" | "グロース";

export interface IpoListing {
  slug: string;
  company: string;
  ticker: string;
  market: IpoMarket;
  tags: string[];
  oneLiner: string;
  ipoDate: string;
  publicPrice: string;
  openingPrice: string;
  priceChangePct: number; // +42 = +42%
  marketCap: string;
  founded: string;
  fundedTotal: string;
  hero: { background: string; icon: FundingIcon; iconColor: string };
  rating: 1 | 2 | 3 | 4 | 5;
  publishedAt: string;
  sections: ReportSection[];
}

const sectionTitlesIpo = [
  "会社概要",
  "事業構造",
  "成長戦略",
  "財務ハイライト",
  "市場・競合",
  "評価サマリ",
  "投資判断 1/3",
  "投資判断 2/3",
  "投資判断 3/3",
  "参照情報",
];

export const ipoListings: IpoListing[] = [
  {
    slug: "armsx",
    company: "ARMS",
    ticker: "9871",
    market: "グロース",
    tags: ["HRTech", "SaaS", "AI/ML"],
    oneLiner: "中堅企業向け人事 SaaS。AI による退職予測が主力機能。",
    ipoDate: "2026-04-22",
    publicPrice: "¥1,580",
    openingPrice: "¥2,250",
    priceChangePct: 42,
    marketCap: "¥184B",
    founded: "2017",
    fundedTotal: "¥3.2B",
    hero: { background: "#EDE7FF", icon: "cpu", iconColor: "#5A2EA1" },
    rating: 5,
    publishedAt: "2026-04-22",
    sections: make10Sections(sectionTitlesIpo),
  },
  {
    slug: "clevergen",
    company: "CleverGen",
    ticker: "9842",
    market: "グロース",
    tags: ["Manufacturing", "IoT", "DeepTech"],
    oneLiner: "中小製造業向け IoT × 生成 AI 検査プラットフォーム。",
    ipoDate: "2026-04-08",
    publicPrice: "¥920",
    openingPrice: "¥1,180",
    priceChangePct: 28,
    marketCap: "¥58B",
    founded: "2015",
    fundedTotal: "¥4.1B",
    hero: { background: "#FFE6D6", icon: "factory", iconColor: "#B05A1A" },
    rating: 4,
    publishedAt: "2026-04-08",
    sections: make10Sections(sectionTitlesIpo),
  },
  {
    slug: "pulset",
    company: "Pulset",
    ticker: "9805",
    market: "グロース",
    tags: ["HealthTech", "SaaS", "AI/ML"],
    oneLiner: "病院向け診療補助 SaaS。三大病院チェーン全てに導入。",
    ipoDate: "2026-03-29",
    publicPrice: "¥2,100",
    openingPrice: "¥2,940",
    priceChangePct: 40,
    marketCap: "¥231B",
    founded: "2016",
    fundedTotal: "¥5.5B",
    hero: { background: "#FFF6E8", icon: "stethoscope", iconColor: "#C97A1F" },
    rating: 4,
    publishedAt: "2026-03-29",
    sections: make10Sections(sectionTitlesIpo),
  },
  {
    slug: "nextlogix",
    company: "NextLogix",
    ticker: "9778",
    market: "スタンダード",
    tags: ["LogiTech", "B2B", "SaaS"],
    oneLiner: "ラストマイル物流の SaaS。EC・小売 1,200 社が利用。",
    ipoDate: "2026-03-15",
    publicPrice: "¥1,250",
    openingPrice: "¥1,420",
    priceChangePct: 14,
    marketCap: "¥92B",
    founded: "2014",
    fundedTotal: "¥2.8B",
    hero: { background: "#DEF0FF", icon: "truck", iconColor: "#1F61A1" },
    rating: 3,
    publishedAt: "2026-03-15",
    sections: make10Sections(sectionTitlesIpo),
  },
  {
    slug: "quanto",
    company: "Quanto",
    ticker: "9745",
    market: "グロース",
    tags: ["Quantum", "DeepTech", "B2B"],
    oneLiner: "量子計算プラットフォーム。創薬・素材 R&D 向け SaaS。",
    ipoDate: "2026-02-26",
    publicPrice: "¥3,200",
    openingPrice: "¥4,800",
    priceChangePct: 50,
    marketCap: "¥412B",
    founded: "2018",
    fundedTotal: "¥12.4B",
    hero: { background: "#E2EAFE", icon: "rocket", iconColor: "#1F61A1" },
    rating: 5,
    publishedAt: "2026-02-26",
    sections: make10Sections(sectionTitlesIpo),
  },
  {
    slug: "beacon",
    company: "Beacon",
    ticker: "9712",
    market: "グロース",
    tags: ["PropTech", "SaaS", "B2B"],
    oneLiner: "商業不動産のオペレーション DX。賃料データ・空室予測。",
    ipoDate: "2026-02-12",
    publicPrice: "¥1,100",
    openingPrice: "¥1,380",
    priceChangePct: 25,
    marketCap: "¥76B",
    founded: "2017",
    fundedTotal: "¥3.6B",
    hero: { background: "#E2F4DC", icon: "building", iconColor: "#2E7A3D" },
    rating: 3,
    publishedAt: "2026-02-12",
    sections: make10Sections(sectionTitlesIpo),
  },
];

export function findIpoListing(slug: string): IpoListing | undefined {
  return ipoListings.find((i) => i.slug === slug);
}

/* ============== ニュース ============== */

export interface NewsItem {
  slug: string;
  title: string;
  metric: string;
  metricColor: string;
  background: string;
  tags: string[];
  excerpt: string;
  body: string[];
  date: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "anthropic-90b",
    title: "Anthropic、評価額 90B ドルで新規ラウンド調達観測",
    metric: "$90B",
    metricColor: "#FF8A4C",
    background: "#1F2A3A",
    tags: ["AI/ML", "Funding"],
    excerpt:
      "Series E 観測。Foundation Model 各社の評価額再加速の引き金となるか。",
    body: [
      "Anthropic が新ラウンドの調達交渉に入り、評価額 90B ドル（約 13.5 兆円）水準が観測されている。直近 18 ヶ月で評価額が 3 倍超になった計算。",
      "Foundation Model 各社の評価額が再加速する局面に入った可能性があり、後続の OpenAI / xAI / Mistral 等のラウンドにも波及する観測。",
    ],
    date: "2026-05-08",
  },
  {
    slug: "ai-cloud-900b",
    title: "ハイパースケーラー AI クラウド支出、年間 900B ドル超",
    metric: "$900B",
    metricColor: "#FFD66B",
    background: "#2E1A3D",
    tags: ["Infra", "AI/ML"],
    excerpt:
      "MS / Google / AWS / Oracle の合計設備投資が初めて 9 兆円台へ。",
    body: [
      "Microsoft / Google / AWS / Oracle の 4 社合計 AI 設備投資が、年間 900B ドル（約 135 兆円）を初めて突破。",
      "GPU クラスタの調達競争に加え、データセンター電力確保のため原発 PPA 契約が同時並行で進行している。",
    ],
    date: "2026-05-07",
  },
  {
    slug: "japan-vc-1340b",
    title: "国内 VC ファンド、累計 1,340 億円が未投資のまま滞留",
    metric: "¥134B",
    metricColor: "#FFE08A",
    background: "#1F2A3A",
    tags: ["VC", "Japan"],
    excerpt:
      "ドライパウダー過剰の一方、シード採択率は前年比 -18% と二極化。",
    body: [
      "国内 VC のドライパウダー（未投資資金）が累計 1,340 億円に達した一方、シードラウンドの採択率は前年比 -18%。",
      "資金集中先は Series A/B の AI 関連企業に偏っており、一般のシード期はむしろ厳しさが増している構図。",
    ],
    date: "2026-05-06",
  },
  {
    slug: "ipo-pipeline-31b",
    title: "国内テック IPO パイプライン、3.1B ドル相当",
    metric: "¥3.1B",
    metricColor: "#FF8A4C",
    background: "#0F2A45",
    tags: ["IPO", "Japan"],
    excerpt:
      "上場予定 12 社のうち 4 社が AI/SaaS。Q3 まで強気観測。",
    body: [
      "東証グロース市場の IPO 予定 12 社の合計時価総額予測が 3.1B ドル（約 4,650 億円）に達する見込み。",
      "うち 4 社が AI/SaaS、3 社が ヘルスケア、2 社が DX 系で、AI/SaaS の比率が初めて 3 割を超える。",
    ],
    date: "2026-05-05",
  },
  {
    slug: "anti-trust-approval-186",
    title: "反トラスト当局承認 186 件、過去最多ペース",
    metric: "186",
    metricColor: "#FF8A4C",
    background: "#1F2A3A",
    tags: ["Policy", "M&A"],
    excerpt: "AI 関連 M&A は審査長期化、平均 6.4 ヶ月へ。",
    body: [
      "公正取引委員会・米 FTC 等の当局承認件数が年初来 186 件と過去最多ペース。",
      "AI 関連 M&A の審査期間は平均 6.4 ヶ月へ長期化、データ集中・市場支配力に対する当局の警戒感が背景。",
    ],
    date: "2026-05-04",
  },
  {
    slug: "deeptech-japan-2-4b",
    title: "国内ディープテック、累計 2.4B ドル調達突破",
    metric: "¥2.4B",
    metricColor: "#FFD66B",
    background: "#1A1F35",
    tags: ["DeepTech", "Japan"],
    excerpt:
      "量子・素材・宇宙の 3 領域に資金集中。政府ファンドの呼び水効果。",
    body: [
      "国内ディープテック企業の累計調達額が初めて 2.4B ドル（約 3,600 億円）を突破。",
      "量子・素材・宇宙の 3 領域への政府ファンドからの先行投資が呼び水となり、民間 VC・CVC の参入も加速している。",
    ],
    date: "2026-05-03",
  },
];
