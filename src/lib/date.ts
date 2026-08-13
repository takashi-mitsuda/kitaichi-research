export function formatDateJa(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long", day: "numeric" }).format(date);
}
