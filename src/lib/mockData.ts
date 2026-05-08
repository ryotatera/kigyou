import type { Video } from "./types";

const SAMPLE_BBB =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_ELEPHANT =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
const SAMPLE_FORBIGGER =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const SAMPLE_SINTEL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";

export const videos: Video[] = [
  {
    id: "kk-01",
    title: "PMF とは何か — Product Market Fit の正体",
    speaker: "田所 雅之",
    category: "起業の科学",
    durationSeconds: 1722,
    videoUrl: SAMPLE_BBB,
    posterColor: "#2A2A2A",
    previewStrategy: "type_b",
    previewEndSeconds: 360,
    paywallMessage: "ここから核心です。続きをご覧ください。",
    description:
      "第 1 章「PMF の定義」までを無料で公開。第 2 章以降の事例編は会員限定で展開します。",
    viewerCount: 8231,
    saveCount: 142,
    chapters: [
      {
        id: "kk-01-c0",
        videoId: "kk-01",
        chapterNumber: 0,
        startSeconds: 0,
        endSeconds: 30,
        title: "Hook：この動画で学べる 3 つのこと",
        isPublic: true,
      },
      {
        id: "kk-01-c1",
        videoId: "kk-01",
        chapterNumber: 1,
        startSeconds: 30,
        endSeconds: 360,
        title: "第 1 章：PMF の定義（5.5 分）",
        isPublic: true,
      },
      {
        id: "kk-01-c2",
        videoId: "kk-01",
        chapterNumber: 2,
        startSeconds: 360,
        endSeconds: 900,
        title: "第 2 章：PMF を測る 4 つの指標",
        isPublic: false,
      },
      {
        id: "kk-01-c3",
        videoId: "kk-01",
        chapterNumber: 3,
        startSeconds: 900,
        endSeconds: 1400,
        title: "第 3 章：PMF 達成事例（Airbnb / Slack / Notion）",
        isPublic: false,
      },
      {
        id: "kk-01-c4",
        videoId: "kk-01",
        chapterNumber: 4,
        startSeconds: 1400,
        endSeconds: 1722,
        title: "第 4 章：PMF 後の罠と Transition to Scale",
        isPublic: false,
      },
    ],
    related: [
      {
        id: "kk-02",
        title: "CPF：顧客課題の検証",
        durationLabel: "23:10",
        thumbColor: "#3D2E5C",
      },
      {
        id: "kk-03",
        title: "PSF：解決策の妥当性",
        durationLabel: "27:42",
        thumbColor: "#3A4D2E",
      },
      {
        id: "sv-01",
        title: "SV 最新事例 30 秒ハイライト",
        durationLabel: "01:30",
        thumbColor: "#4D2E2E",
      },
    ],
  },
  {
    id: "kt-01",
    title: "起業大全：競争戦略の全体像",
    speaker: "田所 雅之",
    category: "起業大全",
    durationSeconds: 1880,
    videoUrl: SAMPLE_ELEPHANT,
    posterColor: "#1F2A3A",
    previewStrategy: "type_b",
    previewEndSeconds: 420,
    paywallMessage: "ここから 5 つの競争戦略パターンに入ります。",
    description:
      "第 1 章「競争戦略の前提」までを無料で公開。フレームワーク詳解は会員限定です。",
    viewerCount: 5103,
    saveCount: 88,
    chapters: [
      {
        id: "kt-01-c0",
        videoId: "kt-01",
        chapterNumber: 0,
        startSeconds: 0,
        endSeconds: 30,
        title: "Hook",
        isPublic: true,
      },
      {
        id: "kt-01-c1",
        videoId: "kt-01",
        chapterNumber: 1,
        startSeconds: 30,
        endSeconds: 420,
        title: "第 1 章：競争戦略の前提（6.5 分）",
        isPublic: true,
      },
      {
        id: "kt-01-c2",
        videoId: "kt-01",
        chapterNumber: 2,
        startSeconds: 420,
        endSeconds: 1100,
        title: "第 2 章：5 つの競争戦略パターン",
        isPublic: false,
      },
      {
        id: "kt-01-c3",
        videoId: "kt-01",
        chapterNumber: 3,
        startSeconds: 1100,
        endSeconds: 1880,
        title: "第 3 章：日本企業の事例分析",
        isPublic: false,
      },
    ],
    related: [
      {
        id: "kk-01",
        title: "PMF とは何か",
        durationLabel: "28:42",
        thumbColor: "#2A2A2A",
      },
      {
        id: "sv-01",
        title: "SV 最新事例ハイライト",
        durationLabel: "01:30",
        thumbColor: "#4D2E2E",
      },
      {
        id: "tk-01",
        title: "対談：CVC 投資家が見る成長企業",
        durationLabel: "32:18",
        thumbColor: "#2E3D4D",
      },
    ],
  },
  {
    id: "sv-01",
    title: "シリコンバレー最新動向 30 秒ハイライト",
    speaker: "現地特派員",
    category: "シリコンバレー先端情報",
    durationSeconds: 90,
    videoUrl: SAMPLE_FORBIGGER,
    posterColor: "#4D2E2E",
    previewStrategy: "type_c",
    previewEndSeconds: 90,
    paywallMessage: "フル動画（25 分）で全 12 社の取材詳細を観る",
    description:
      "本編の見どころを 90 秒に凝縮したハイライト版。フル動画（25 分）は会員限定です。",
    viewerCount: 12480,
    saveCount: 304,
    highlightUrl: SAMPLE_FORBIGGER,
    chapters: [
      {
        id: "sv-01-c0",
        videoId: "sv-01",
        chapterNumber: 0,
        startSeconds: 0,
        endSeconds: 90,
        title: "ハイライト：12 社の生声 90 秒",
        isPublic: true,
      },
      {
        id: "sv-01-c1",
        videoId: "sv-01",
        chapterNumber: 1,
        startSeconds: 90,
        endSeconds: 1500,
        title: "本編：12 社取材ノーカット（25 分）",
        isPublic: false,
      },
    ],
    related: [
      {
        id: "kk-01",
        title: "PMF とは何か",
        durationLabel: "28:42",
        thumbColor: "#2A2A2A",
      },
      {
        id: "kt-01",
        title: "起業大全：競争戦略",
        durationLabel: "31:20",
        thumbColor: "#1F2A3A",
      },
      {
        id: "tk-01",
        title: "対談：CVC 投資家",
        durationLabel: "32:18",
        thumbColor: "#2E3D4D",
      },
    ],
  },
  {
    id: "tk-01",
    title: "対談：CVC 投資家が見る、伸びる起業家の共通点",
    speaker: "田所 雅之 × 某 CVC マネージング・ディレクター",
    category: "対談",
    durationSeconds: 1938,
    videoUrl: SAMPLE_SINTEL,
    posterColor: "#2E3D4D",
    previewStrategy: "type_a",
    previewEndSeconds: 180,
    paywallMessage: "ここから核心です。続きをご覧ください。",
    description:
      "「伸びる起業家の 3 条件」のイントロ 3 分までを無料で公開。具体エピソードと投資判断ロジックは会員限定です。",
    viewerCount: 3920,
    saveCount: 76,
    chapters: [
      {
        id: "tk-01-c0",
        videoId: "tk-01",
        chapterNumber: 0,
        startSeconds: 0,
        endSeconds: 180,
        title: "イントロ：伸びる起業家の 3 条件（3 分）",
        isPublic: true,
      },
      {
        id: "tk-01-c1",
        videoId: "tk-01",
        chapterNumber: 1,
        startSeconds: 180,
        endSeconds: 1100,
        title: "本編：3 条件の具体エピソード",
        isPublic: false,
      },
      {
        id: "tk-01-c2",
        videoId: "tk-01",
        chapterNumber: 2,
        startSeconds: 1100,
        endSeconds: 1938,
        title: "本編：投資判断ロジック",
        isPublic: false,
      },
    ],
    related: [
      {
        id: "kk-01",
        title: "PMF とは何か",
        durationLabel: "28:42",
        thumbColor: "#2A2A2A",
      },
      {
        id: "kt-01",
        title: "起業大全：競争戦略",
        durationLabel: "31:20",
        thumbColor: "#1F2A3A",
      },
      {
        id: "sv-01",
        title: "SV 最新事例 90 秒",
        durationLabel: "01:30",
        thumbColor: "#4D2E2E",
      },
    ],
  },
];

export function findVideo(id: string): Video | undefined {
  return videos.find((v) => v.id === id);
}

export function strategyLabel(s: Video["previewStrategy"]): {
  badge: string;
  description: string;
} {
  switch (s) {
    case "type_a":
      return {
        badge: "イントロ 3 分公開",
        description: "冒頭 3 分で本題の入口まで観られます",
      };
    case "type_b":
      return {
        badge: "第 1 章まるごと公開",
        description: "1 つのテーマが完結する第 1 章までを無料で観られます",
      };
    case "type_c":
      return {
        badge: "90 秒ハイライト",
        description: "本編の見どころを 90 秒に凝縮",
      };
    case "type_d":
      return {
        badge: "イントロ + ハイライト",
        description: "冒頭 60 秒とハイライト 60 秒の組み合わせ",
      };
  }
}
