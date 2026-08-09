import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { H1 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "免責事項・データ検証ポリシー",
};

export default function PolicyPage() {
  return (
    <Container>
      <H1>免責事項・データ検証ポリシー</H1>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-lg font-bold">掲載データについて</h2>
        <p>
          当サイトに掲載する期待値・還元率は、公開情報および当研究所が独自に収集したデータに基づく
          <strong>理論値</strong>
          であり、実際の結果を保証するものではありません。期待値は長期的・統計的な平均を示す指標であり、個々の購入結果を保証するものではありません。
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-lg font-bold">算出方法</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>期待値・還元率は、運営側が公表する表示価格ではなく、実際の買取・換金相場（換金ベース）を基準に算出しています</li>
          <li>各データには算出方法、データの取得元、最終検証日を明記しています</li>
          <li>相場の変動により、掲載時点の数値と現在の実際の価値が異なる場合があります。最終検証日をご確認の上、参考情報としてご利用ください</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-lg font-bold">情報の性質について</h2>
        <p>
          当サイトのコンテンツは、期待値という指標を用いた情報提供・研究を目的としたものであり、特定の商品の購入や特定のサービスの利用を勧誘するものではありません。購入・利用の判断は、必ずご自身の責任において行ってください。
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-lg font-bold">アフィリエイトプログラムについて</h2>
        <p>
          当サイトは、Amazonアソシエイト・楽天アフィリエイト等のアフィリエイトプログラム、および掲載企業との提携プログラムに参加しています。当サイト経由の申込み・購入により、当サイトが紹介料を受け取る場合があります。ただし、紹介料の有無は掲載内容・評価に影響しません。
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-lg font-bold">未成年の方へ</h2>
        <p>くじ・競馬など、年齢制限が定められている商品・サービスについては、関連法令に従い、対象年齢に満たない方はご利用いただけません。</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-lg font-bold">データの誤りについて</h2>
        <p>
          掲載内容に誤りを発見された場合は、<Link href="/contact">お問い合わせページ</Link>
          よりご連絡ください。確認のうえ、速やかに訂正いたします。
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-lg font-bold">著作権について</h2>
        <p>当サイトに掲載する文章・データ・画像の無断転載・複製を禁じます。引用の際は出典元として当サイトのURLを明記してください。</p>
      </section>

      <p className="mt-10 text-sm text-ink/50">
        制定日：2026年7月15日
        <br />
        最終更新日：2026年7月15日
      </p>
    </Container>
  );
}
