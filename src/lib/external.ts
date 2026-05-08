/* 本番アプリ（認証・動画視聴・マイページ）の URL
 * このサイトはマーケティング／SEO 公開ポータル。
 * 会員登録・ログイン・マイページは外部本番アプリへ誘導する。
 */

export const APP_BASE_URL = "https://video-search-app-ten.vercel.app";
export const SIGNUP_URL = `${APP_BASE_URL}/auth/signup`;
export const LOGIN_URL = `${APP_BASE_URL}/auth/login`;
export const APP_DASHBOARD_URL = `${APP_BASE_URL}/mypage`;

export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
