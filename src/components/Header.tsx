"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const siteName = "期待値研究所";

const navLinks = [
  { href: "/oripa", label: "オリパ記事一覧" },
  { href: "/oripa/ranking", label: "還元率ランキング" },
  { href: "/oripa/report", label: "解説記事" },
  { href: "/oripa/store", label: "サイト評価" },
  { href: "/about", label: "研究所について" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/75 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3 md:py-4">
        {/* 横組みロゴ画像は縮小すると文字が読めなくなるため、PC/モバイル共通でアイコン+ライブテキストの組み方にする */}
        <Link href="/" className="flex items-center gap-2 md:gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo-mark.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-8 w-8 rounded-lg md:h-11 md:w-11"
          />
          <span className="text-base font-bold text-ink md:text-xl">{siteName}</span>
        </Link>

        {/* デスクトップ用ナビ(md以上で表示) */}
        <nav className="hidden gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink hover:text-vermillion">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* モバイル用ハンバーガーボタン(md未満で表示) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* モバイル用ドロップダウンメニュー */}
      {open && (
        <nav id="mobile-nav" className="border-t border-ink/10 md:hidden">
          <ul className="mx-auto max-w-4xl divide-y divide-ink/10 px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-ink hover:text-vermillion"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
