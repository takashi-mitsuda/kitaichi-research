import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-bold tracking-[0.15em] text-ink/50">{children}</p>;
}

// トップページのヒーロー専用。記事・個別ページの見出しにはH1を使う
export function HeroHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.15] tracking-tight">{children}</h1>
  );
}

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight">{children}</h1>
  );
}

// h2/h3共通のあしらい:見出し文字の左に朱色の線を出す
export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-l-4 border-vermillion pl-4 text-2xl font-bold tracking-tight sm:pl-5 sm:text-3xl">
      {children}
    </h2>
  );
}

// ページ内の小見出し用。実際に使うHTMLタグはページの見出し階層に合わせてasで切り替える
// (例:About等ではH2の下でh3、Policy/Privacy等でH1直下のためh2として使う)
export function H3({ children, as: Tag = "h3" }: { children: ReactNode; as?: "h2" | "h3" }) {
  return (
    <Tag className="border-l-[3px] border-vermillion pl-3 text-lg font-bold">{children}</Tag>
  );
}
