import type { ReactNode } from "react";

const sizeClass = {
  article: "max-w-2xl",
  wide: "max-w-4xl",
} as const;

export function Container({
  size = "article",
  className = "",
  children,
}: {
  size?: keyof typeof sizeClass;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`mx-auto ${sizeClass[size]} px-6 py-16 ${className}`}>{children}</div>;
}
