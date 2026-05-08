export type PreviewStrategy = "type_a" | "type_b" | "type_c" | "type_d";

export type VideoCategory =
  | "起業の科学"
  | "起業大全"
  | "シリコンバレー先端情報"
  | "起業参謀"
  | "BM 解体新書"
  | "SU クライマーズ"
  | "対談"
  | "ピッチ徹底検証"
  | "成功スタートアップ解体新書"
  | "ビジネスモデル解体新書"
  | "トップ起業家の素顔";

export interface Chapter {
  id: string;
  videoId: string;
  chapterNumber: number;
  startSeconds: number;
  endSeconds: number;
  title: string;
  isPublic: boolean;
}

export interface RelatedVideoStub {
  id: string;
  title: string;
  durationLabel: string;
  thumbColor: string;
}

export interface Video {
  id: string;
  title: string;
  speaker: string;
  category: VideoCategory;
  durationSeconds: number;
  videoUrl: string;
  posterColor: string;
  previewStrategy: PreviewStrategy;
  previewEndSeconds: number;
  paywallMessage: string;
  description: string;
  viewerCount: number;
  saveCount: number;
  chapters: Chapter[];
  related: RelatedVideoStub[];
  highlightUrl?: string;
}
