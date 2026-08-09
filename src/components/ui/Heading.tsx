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

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{children}</h2>;
}
