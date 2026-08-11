import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import { Header } from "@/components/Header";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {/* ヘッダー高さ分の余白は各ページ側(Container等)で確保する。トップページのヒーローは背景をヘッダーの下まで見せたいため、ここでは余白を追加しない */}
        <main className="flex-1">{children}</main>
        <footer className="border-t border-ink/10 mt-16">
          <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-ink/50">
            {/* サイトマップ列は削除(ハンバーガーメニュー等のナビと重複するため)。
                ポリシー列は見出しのみ外し、ナビに無いリンク(Policy/Privacy/Contact)を残す */}
            <ul className="space-y-2">
              <li>
                <Link href="/about">研究所について</Link>
              </li>
              <li>
                <Link href="/policy">免責事項・データ検証ポリシー</Link>
              </li>
              <li>
                <Link href="/privacy">プライバシーポリシー</Link>
              </li>
              <li>
                <Link href="/contact">お問い合わせ</Link>
              </li>
            </ul>
            <p className="mt-8">&copy; {new Date().getFullYear()} 期待値研究所</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
