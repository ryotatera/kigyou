/* 起業の科学 — カリキュラム構造（5 章 / 21 サブ章 / 104 本） */

export interface SubChapter {
  id: string; // 例: "1-1"
  title: string;
  videoCount: number;
}

export interface CurriculumChapter {
  number: number;
  title: string;
  videoCount: number;
  color: string; // チャプターごとの色（番号バッジに使用）
  description: string;
  subChapters: SubChapter[];
}

export const kigyouNoKagakuCurriculum: CurriculumChapter[] = [
  {
    number: 1,
    title: "アイデアの検証",
    videoCount: 41,
    color: "#1F61A1",
    description:
      "起業の最初に最も多くのスタートアップがつまずくフェーズ。アイデアの筋を見極め、検証可能な仮説に落とし込む。",
    subChapters: [
      { id: "1-1", title: "アイディアに気付く", videoCount: 14 },
      { id: "1-2", title: "スタートアップのメタ原則", videoCount: 8 },
      { id: "1-3", title: "アイデアの検証", videoCount: 17 },
      { id: "1-4", title: "Plan A の作成", videoCount: 2 },
    ],
  },
  {
    number: 2,
    title: "課題の質を上げる",
    videoCount: 15,
    color: "#2E7A3D",
    description:
      "顧客が本当に困っている課題を、自分の思い込みではなく一次情報から特定する。プロブレムインタビューで課題仮説を磨く。",
    subChapters: [
      { id: "2-1", title: "課題仮説の構築", videoCount: 4 },
      { id: "2-2", title: "プロブレムインタビューを行う", videoCount: 5 },
      { id: "2-3", title: "課題の質を高める", videoCount: 6 },
    ],
  },
  {
    number: 3,
    title: "ソリューションの検証",
    videoCount: 6,
    color: "#C97A1F",
    description:
      "課題の解像度が上がった上で、解決策の妥当性を検証する。プロトタイプとソリューションインタビューで PSF を確認。",
    subChapters: [
      { id: "3-1", title: "ソリューションの本質を理解する", videoCount: 2 },
      { id: "3-2", title: "Build Prototype", videoCount: 2 },
      { id: "3-3", title: "Solution インタビュー", videoCount: 2 },
    ],
  },
  {
    number: 4,
    title: "人が欲しがるものを作る",
    videoCount: 24,
    color: "#A8351A",
    description:
      "MVP を構築し、定量・定性両面で検証する。継続的な UX 改善を経て、PMF（Product-Market Fit）を確認するまでのプロセス。",
    subChapters: [
      { id: "4-1", title: "MVP を構築する", videoCount: 6 },
      {
        id: "4-2",
        title: "MVP / プロダクトをカスタマーに届ける",
        videoCount: 3,
      },
      { id: "4-3", title: "定量的計測と定性的計測を行う", videoCount: 1 },
      { id: "4-4", title: "継続的な UX 改善", videoCount: 10 },
      {
        id: "4-5",
        title: "PMF を達成できたか？再現性があるか？",
        videoCount: 3,
      },
      { id: "4-6", title: "ビジネスモデルの Pivot を行う", videoCount: 1 },
    ],
  },
  {
    number: 5,
    title: "収益性を改善 & 勝ち続ける仕組み構築",
    videoCount: 18,
    color: "#5A2EA1",
    description:
      "PMF を達成した後、いかに収益性を改善し競争優位を築くか。CAC・LTV・MOAT・PMF の掛け合わせまで。",
    subChapters: [
      { id: "5-1", title: "収益性を改善する", videoCount: 5 },
      { id: "5-2", title: "CAC を下げる", videoCount: 4 },
      { id: "5-3", title: "PMF を磐石にして LTV を高める", videoCount: 2 },
      { id: "5-4", title: "MOAT を構築する", videoCount: 4 },
      { id: "5-5", title: "PMF を掛け合わせていく", videoCount: 3 },
    ],
  },
];

export const kigyouNoKagakuTotal = kigyouNoKagakuCurriculum.reduce(
  (acc, c) => acc + c.videoCount,
  0,
);
