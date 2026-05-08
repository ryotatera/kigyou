import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 静的サイト用 Supabase クライアント。
 * - GitHub Pages では Server Component から DB を叩けないため、
 *   ビルド時に anon key で読み取る or クライアントランタイムで読む。
 * - 機密データは RLS で保護されている前提（anon は読み取りのみ）。
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!URL || !ANON_KEY) return null;
  if (cached) return cached;
  cached = createClient(URL, ANON_KEY, {
    auth: { persistSession: false },
  });
  return cached;
}

export const supabaseEnabled = Boolean(URL && ANON_KEY);
