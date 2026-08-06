import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const siteName = "期待値研究所";
const description =
  "勘ではなく、期待値で選ぶ。オリパ・カードBOX・ふるさと納税・くじ・競馬など「得する確率」が関わる選択を、数字で検証するリサーチメディア。";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitaichi-research.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s｜${siteName}`,
  },
  description,
  openGraph: {
    siteName,
    description,
    locale: "ja_JP",
    type: "website",
    images: ["/logo-horizontal.png"],
  },
  twitter: {
    card: "summary_large_image",
    description,
    images: ["/logo-horizontal.png"],
  },
};

const navLinks = [
  { href: "/oripa", label: "オリパ研究部門" },
  { href: "/oripa/ranking", label: "還元率ランキング" },
  { href: "/about", label: "研究所について" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-ink/10">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo-horizontal.png" alt={siteName} width={160} height={40} priority className="h-8 w-auto" />
            </Link>
            <nav className="flex gap-6 text-sm">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-ink hover:text-vermillion">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-ink/10 mt-16">
          <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-8 text-sm text-ink/60">
            <div className="flex flex-wrap gap-4">
              <Link href="/about">研究所について</Link>
              <Link href="/policy">免責事項・データ検証ポリシー</Link>
              <Link href="/privacy">プライバシーポリシー</Link>
              <Link href="/contact">お問い合わせ</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} 期待値研究所</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
