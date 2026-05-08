import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FundingRow, IpoRow } from "@/lib/insights-data";

export function FundingPreviewRows({ rows }: { rows: FundingRow[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white shadow-editorial">
      {rows.map((r) => (
        <li key={r.slug}>
          <Link
            href={`/insights/funding/${r.slug}`}
            className="grid grid-cols-[88px_1fr_auto] items-center gap-3 px-4 py-3 transition hover:bg-paper-warm sm:grid-cols-[100px_1fr_140px_auto] sm:gap-4 sm:px-5"
          >
            <span className="font-mono text-[11px] text-ink-mute">{r.date}</span>
            <div className="min-w-0">
              <p className="serif truncate text-sm font-semibold text-ink">
                {r.company}
                {r.round ? (
                  <span className="ml-2 rounded-full bg-paper-warm px-1.5 py-0.5 align-middle text-[10px] font-mono text-ink-soft">
                    {r.round}
                  </span>
                ) : null}
              </p>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-ink-mute">
                {r.sector || "—"}
              </p>
            </div>
            <span className="hidden text-right font-mono text-sm font-semibold text-accent sm:block">
              {r.amount || "—"}
            </span>
            <ArrowRight
              className="h-4 w-4 text-ink-mute"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function IpoPreviewRows({ rows }: { rows: IpoRow[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white shadow-editorial">
      {rows.map((r) => (
        <li key={r.slug}>
          <Link
            href={`/insights/ipo/${r.slug}`}
            className="grid grid-cols-[88px_1fr_auto] items-center gap-3 px-4 py-3 transition hover:bg-paper-warm sm:grid-cols-[100px_1fr_120px_120px_auto] sm:gap-4 sm:px-5"
          >
            <span className="font-mono text-[11px] text-ink-mute">{r.ipoDate}</span>
            <div className="min-w-0">
              <p className="serif truncate text-sm font-semibold text-ink">
                {r.company}
              </p>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-ink-mute">
                主幹事 {r.lead || "—"}
              </p>
            </div>
            <span className="hidden text-right font-mono text-sm font-semibold text-accent sm:block">
              {r.mcapOku ? `${r.mcapOku.toFixed(1)}億円` : "—"}
            </span>
            <span className="hidden text-right font-mono text-xs text-emerald-700 sm:block">
              {r.growthPct !== null ? `+${r.growthPct.toFixed(1)}%` : "—"}
            </span>
            <ArrowRight
              className="h-4 w-4 text-ink-mute"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
