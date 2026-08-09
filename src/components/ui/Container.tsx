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
  return <Tag className={`mx-auto ${sizeClass[size]} px-6 py-16 ${className}`}>{children}</Tag>;
}
