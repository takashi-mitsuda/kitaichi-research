import Link from "next/link";
import type { ReactNode } from "react";

export function Button({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-block bg-ink px-6 py-3 font-bold text-paper">
      {children}
    </Link>
  );
}
