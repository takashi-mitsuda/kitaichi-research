import type { ReactNode } from "react";

const variantClass = {
  neutral: "border-ink/10 text-ink/70",
  positive: "border-ink/10 text-vermillion",
  caution: "border-ink/30 text-ink/70",
} as const;

export function Badge({
  variant = "neutral",
  children,
}: {
  variant?: keyof typeof variantClass;
  children: ReactNode;
}) {
  return (
    <span className={`inline-block border px-2 py-0.5 text-xs font-bold ${variantClass[variant]}`}>{children}</span>
  );
}
