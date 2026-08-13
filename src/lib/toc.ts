export type TocItem = { id: string; text: string; level: 2 | 3 };

// microCMSのリッチテキストHTMLからh2/h3を抽出してid付与し、目次データを作る。
// h2を追加・削除すればレンダリング時に毎回この関数が再抽出するため、目次は自動で追随する。
export function extractToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let index = 0;

  const newHtml = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g, (_match, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    index += 1;
    const id = `section-${index}`;
    const cleanedAttrs = String(attrs).replace(/\sid="[^"]*"/, "");
    toc.push({ id, text, level: Number(level) as 2 | 3 });
    return `<h${level}${cleanedAttrs} id="${id}">${inner}</h${level}>`;
  });

  return { html: newHtml, toc };
}
