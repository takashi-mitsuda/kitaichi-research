import type { ReactNode } from "react";

// 薄いグレー背景で本文ブロックにメリハリをつける共通パーツ。角丸は使わない(ブランドのフラット原則)。
// 「のっぺり」しがちな説明文ブロックなどに使う想定。
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border border-ink/10 bg-ink/[0.03] p-6 sm:p-8 ${className}`}>{children}</div>;
}
