import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="serif text-6xl font-semibold text-ink">404</p>
      <p className="mt-3 text-ink-mute">この動画は見つかりませんでした。</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-ink px-4 py-2 text-sm text-white"
      >
        動画一覧へ
      </Link>
    </div>
  );
}
