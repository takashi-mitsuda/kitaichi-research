import type { TocItem } from "@/lib/toc";

// 記事コンテンツ(解説記事・サイト評価)用の目次。h2/h3の抽出結果(lib/toc.ts)をそのまま渡す。
export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="目次" className="mt-8 border border-ink/10">
      <p className="border-b border-ink/10 bg-ink/[0.03] px-5 py-3 text-xs font-bold tracking-[0.15em] text-ink/50">
        目次
      </p>
      <ol className="divide-y divide-ink/10">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`flex items-baseline gap-3 px-5 py-3 hover:text-vermillion ${
                item.level === 3 ? "pl-9 text-sm text-ink/70" : "font-bold"
              }`}
            >
              <span className="text-sm tabular-nums text-ink/30">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
