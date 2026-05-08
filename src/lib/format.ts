export function formatSeconds(total: number): string {
  if (!Number.isFinite(total) || total < 0) total = 0;
  const t = Math.floor(total);
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatRemaining(total: number): string {
  const t = Math.max(0, Math.floor(total));
  const m = Math.floor(t / 60);
  if (m >= 1) return `あと ${m} 分`;
  return `あと ${t} 秒`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("ja-JP");
}
