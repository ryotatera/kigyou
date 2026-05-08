import { notFound } from "next/navigation";
import Link from "next/link";
import { findVideo, strategyLabel, videos } from "@/lib/mockData";
import { formatNumber, formatSeconds } from "@/lib/format";
import { VideoPage } from "./VideoPage";

export function generateStaticParams() {
  return videos.map((v) => ({ id: v.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = findVideo(id);
  if (!video) notFound();
  const s = strategyLabel(video.previewStrategy);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-xs text-ink-mute hover:text-ink"
      >
        ← 動画一覧へ戻る
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="mb-4 flex items-center gap-2 text-xs">
            <span className="rounded-full bg-ink px-2.5 py-1 font-medium text-white">
              {s.badge}
            </span>
            <span className="text-ink-mute">{s.description}</span>
          </div>

          <h1 className="serif mb-2 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {video.title}
          </h1>
          <p className="mb-6 text-sm text-ink-mute">
            {video.category} · {video.speaker} · 全長 {formatSeconds(video.durationSeconds)}
          </p>

          {/* クライアント側でプレイヤー＋ペイウォール */}
          <VideoPage video={video} />

          <p className="mt-6 text-base leading-relaxed text-ink-soft">{video.description}</p>
        </div>

        {/* チャプター サイドバー */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-line bg-white p-5 shadow-editorial">
            <h2 className="serif text-lg font-semibold text-ink">チャプター</h2>
            <p className="mt-1 text-xs text-ink-mute">
              公開 {formatSeconds(video.previewEndSeconds)} / 全長{" "}
              {formatSeconds(video.durationSeconds)}
            </p>

            <ol className="mt-4 space-y-3">
              {video.chapters.map((c) => (
                <li
                  key={c.id}
                  className={`rounded-md border px-3 py-2 text-sm ${
                    c.isPublic
                      ? "border-accent/30 bg-accent/5 text-ink"
                      : "border-line bg-paper-warm text-ink-soft"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">
                      {c.chapterNumber === 0 ? "Hook" : `第 ${c.chapterNumber} 章`}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        c.isPublic
                          ? "bg-accent text-white"
                          : "bg-ink-mute/20 text-ink-mute"
                      }`}
                    >
                      {c.isPublic ? "公開" : "会員限定 🔒"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-snug">{c.title}</p>
                  <p className="mt-1 font-mono text-[10px] text-ink-mute">
                    {formatSeconds(c.startSeconds)} – {formatSeconds(c.endSeconds)}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-5 border-t border-line pt-4 text-xs text-ink-mute">
              <p>👥 {formatNumber(video.viewerCount)} 人が視聴</p>
              <p>💾 {formatNumber(video.saveCount)} 件保存</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-paper-warm p-4 text-xs text-ink-soft">
            <p className="font-semibold text-ink">この動画について</p>
            <p className="mt-2 leading-relaxed">
              最初の {formatSeconds(video.previewEndSeconds)} は会員登録なしで視聴できます。
              続きは 10 日無料のトライアルで観られます。
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
