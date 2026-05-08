/* Supabase からのデータ取得（ビルド時 = Server Component で呼ぶ）。
 * 静的エクスポートでも generateStaticParams と Server Components の組合せで HTML に焼き込まれる。
 * env が無い場合は空配列を返してフォールバック。
 */

import { getSupabase } from "./supabase";

/* ============== 型 ============== */

export interface DbVideo {
  id: string;
  videoId: string;
  title: string;
  description: string | null;
  duration: number | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  youtubeId: string | null;
  tags: string[];
  viewCount: number;
  isFeatured: boolean;
  chapter: string | null;
  step: string | null;
  subcategory: string | null;
  categoryId: number | null;
  publishedAt: string | null;
}

/** YouTube URL から ID を抽出 */
export function youtubeIdFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const m =
    url.match(/youtu\.be\/([\w-]{8,})/) ||
    url.match(/youtube\.com\/watch\?v=([\w-]{8,})/) ||
    url.match(/youtube\.com\/embed\/([\w-]{8,})/);
  return m ? m[1] : null;
}

export interface DbCategory {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  bgColor: string | null;
  colorFrom: string | null;
  colorTo: string | null;
}

export interface DbIpoArticle {
  id: string;
  slug: string;
  ticker: string | null;
  companyName: string;
  companyNameEn: string | null;
  market: string | null;
  industry: string | null;
  listingDate: string | null;
  ratingScore: number | null;
  ratingBreakdown: Record<string, unknown> | null;
  thumbnailUrl: string | null;
  publishedAt: string | null;
  totalChars: number | null;
}

export interface DbAiFrontlineArticle {
  id: string;
  slug: string;
  headline: string;
  subtitle: string | null;
  tldr: string | null;
  lab: string | null;
  modelName: string | null;
  releaseDate: string | null;
  thumbnailUrl: string | null;
  readMinutes: number | null;
  entrepreneurScore: number | null;
  scoreTotal: number | null;
  publishedAt: string | null;
  tags: string[];
}

/* ============== Fetchers（generic + 各テーブル） ============== */

const COMMON: RequestInit = {
  next: { revalidate: 3600 }, // 静的エクスポートでは無視。SSR 時のみ有効。
};

export async function fetchVideos(): Promise<DbVideo[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("videos")
    .select(
      "id, video_id, title, description, duration, thumbnail_url, custom_thumbnail_url, video_url, tags, view_count, is_featured, chapter, step, subcategory, category_id, published_at, is_published",
    )
    .eq("is_published", true)
    .is("deleted_at", null)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(400);
  if (error) {
    console.warn("[db] fetchVideos:", error.message);
    return [];
  }
  return (data ?? []).map(
    (r): DbVideo => ({
      id: r.id,
      videoId: r.video_id,
      title: r.title,
      description: r.description,
      duration: r.duration,
      thumbnailUrl: r.custom_thumbnail_url ?? r.thumbnail_url,
      videoUrl: r.video_url,
      youtubeId: youtubeIdFromUrl(r.video_url),
      tags: Array.isArray(r.tags) ? r.tags : [],
      viewCount: r.view_count ?? 0,
      isFeatured: !!r.is_featured,
      chapter: r.chapter,
      step: r.step,
      subcategory: r.subcategory,
      categoryId: r.category_id,
      publishedAt: r.published_at,
    }),
  );
}

/** プレビュー用：複数カテゴリからミックス（カテゴリごとに最大 1-2 本） */
export async function fetchPreviewVideos(limit = 6): Promise<DbVideo[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  // 多めに取得してカテゴリでバランス
  const { data, error } = await supabase
    .from("videos")
    .select(
      "id, video_id, title, description, duration, thumbnail_url, custom_thumbnail_url, video_url, tags, view_count, is_featured, chapter, step, subcategory, category_id, published_at",
    )
    .eq("is_published", true)
    .is("deleted_at", null)
    .not("video_url", "is", null)
    .order("view_count", { ascending: false })
    .limit(80);
  if (error) return [];

  const all = (data ?? [])
    .map(
      (r): DbVideo => ({
        id: r.id,
        videoId: r.video_id,
        title: r.title,
        description: r.description,
        duration: r.duration,
        thumbnailUrl: r.custom_thumbnail_url ?? r.thumbnail_url,
        videoUrl: r.video_url,
        youtubeId: youtubeIdFromUrl(r.video_url),
        tags: Array.isArray(r.tags) ? r.tags : [],
        viewCount: r.view_count ?? 0,
        isFeatured: !!r.is_featured,
        chapter: r.chapter,
        step: r.step,
        subcategory: r.subcategory,
        categoryId: r.category_id,
        publishedAt: r.published_at,
      }),
    )
    .filter((v) => v.youtubeId);

  // カテゴリ別に最大 MAX_PER_CAT 本を Round-robin で選択
  const MAX_PER_CAT = 2;
  const buckets = new Map<string, DbVideo[]>();
  all.forEach((v) => {
    const key = v.categoryId !== null ? String(v.categoryId) : "none";
    if (!buckets.has(key)) buckets.set(key, []);
    const bucket = buckets.get(key)!;
    if (bucket.length < MAX_PER_CAT) bucket.push(v);
  });

  // Round-robin にカテゴリを跨いで取り出し
  const out: DbVideo[] = [];
  let progress = true;
  while (out.length < limit && progress) {
    progress = false;
    for (const bucket of buckets.values()) {
      if (out.length >= limit) break;
      if (bucket.length > 0) {
        out.push(bucket.shift()!);
        progress = true;
      }
    }
  }
  return out;
}

export async function fetchCategories(): Promise<DbCategory[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, slug, name, description, icon, color, bg_color, color_from, color_to, is_active, sort_order",
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.warn("[db] fetchCategories:", error.message);
    return [];
  }
  return (data ?? []).map(
    (r): DbCategory => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      description: r.description,
      icon: r.icon,
      color: r.color,
      bgColor: r.bg_color,
      colorFrom: r.color_from,
      colorTo: r.color_to,
    }),
  );
}

export async function fetchIpoArticles(): Promise<DbIpoArticle[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("ipo_articles")
    .select(
      "id, slug, ticker, company_name, company_name_en, market, industry, listing_date, rating_score, rating_breakdown, thumbnail_url, published_at, total_chars, status",
    )
    .order("listing_date", { ascending: false, nullsFirst: false })
    .limit(50);
  if (error) {
    console.warn("[db] fetchIpoArticles:", error.message);
    return [];
  }
  return (data ?? []).map(
    (r): DbIpoArticle => ({
      id: r.id,
      slug: r.slug,
      ticker: r.ticker,
      companyName: r.company_name,
      companyNameEn: r.company_name_en,
      market: r.market,
      industry: r.industry,
      listingDate: r.listing_date,
      ratingScore: r.rating_score ? Number(r.rating_score) : null,
      ratingBreakdown: r.rating_breakdown,
      thumbnailUrl: r.thumbnail_url,
      publishedAt: r.published_at,
      totalChars: r.total_chars,
    }),
  );
}

export async function fetchIpoArticleBySlug(
  slug: string,
): Promise<DbIpoArticle | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("ipo_articles")
    .select(
      "id, slug, ticker, company_name, company_name_en, market, industry, listing_date, rating_score, rating_breakdown, thumbnail_url, published_at, total_chars",
    )
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return {
    id: data.id,
    slug: data.slug,
    ticker: data.ticker,
    companyName: data.company_name,
    companyNameEn: data.company_name_en,
    market: data.market,
    industry: data.industry,
    listingDate: data.listing_date,
    ratingScore: data.rating_score ? Number(data.rating_score) : null,
    ratingBreakdown: data.rating_breakdown,
    thumbnailUrl: data.thumbnail_url,
    publishedAt: data.published_at,
    totalChars: data.total_chars,
  };
}

export async function fetchAiArticles(): Promise<DbAiFrontlineArticle[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("ai_frontline_articles")
    .select(
      "id, slug, headline, subtitle, tldr, lab, model_name, release_date, thumbnail_url, read_minutes, entrepreneur_score, score_total, published_at, tags, status",
    )
    .order("release_date", { ascending: false, nullsFirst: false })
    .limit(30);
  if (error) {
    console.warn("[db] fetchAiArticles:", error.message);
    return [];
  }
  return (data ?? []).map(
    (r): DbAiFrontlineArticle => {
      // tags は jsonb なので文字列化
      let tags: string[] = [];
      if (Array.isArray(r.tags)) tags = r.tags as string[];
      else if (r.tags && typeof r.tags === "object") {
        tags = Object.values(r.tags as Record<string, unknown>).filter(
          (v): v is string => typeof v === "string",
        );
      }
      return {
        id: r.id,
        slug: r.slug,
        headline: r.headline,
        subtitle: r.subtitle,
        tldr: r.tldr,
        lab: r.lab,
        modelName: r.model_name,
        releaseDate: r.release_date,
        thumbnailUrl: r.thumbnail_url,
        readMinutes: r.read_minutes,
        entrepreneurScore: r.entrepreneur_score,
        scoreTotal: r.score_total,
        publishedAt: r.published_at,
        tags,
      };
    },
  );
}

export { COMMON };
