import type { ReactNode } from "react";

const sizeClass = {
  article: "max-w-2xl",
  wide: "max-w-4xl",
} as const;

export function Container({
  size = "article",
  as: Tag = "div",
  className = "",
  children,
}: {
  size?: keyof typeof sizeClass;
  as?: "div" | "article";
  className?: string;
  children: ReactNode;
}) {
  // ヘッダーがfixedのため、ここでヘッダー高さ分の余白を確保する(トップページのヒーローは自前のpaddingで確保済みのため対象外)
  return <Tag className={`mx-auto ${sizeClass[size]} px-6 pb-16 pt-28 md:pt-32 ${className}`}>{children}</Tag>;
}
