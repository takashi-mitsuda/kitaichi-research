import Link from "next/link";
import type { ReactNode } from "react";

export function Button({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block border border-vermillion bg-paper px-6 py-3 font-bold text-vermillion transition hover:bg-vermillion hover:text-paper"
    >
      {children}
    </Link>
  );
}
