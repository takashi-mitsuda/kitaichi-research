import type { ReactNode } from "react";

const paddingClass = {
  sm: "p-4",
  lg: "p-6",
} as const;

export function Card({
  padding = "sm",
  className = "",
  children,
}: {
  padding?: keyof typeof paddingClass;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`border border-ink/10 ${paddingClass[padding]} ${className}`}>{children}</div>;
}
