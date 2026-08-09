import type { Metadata } from "next";
import Link from "next/link";
import { H1, H2 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "研究所について",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <H1>期待値研究所について</H1>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H2>期待値研究所とは</H2>
        <p className="font-medium text-vermillion">「勘ではなく、期待値で選ぶ。」</p>
        <p>
          期待値研究所は、オリパ（オンラインくじ・トレーディングカードのオリジナルパック）をはじめ、カードBOX、ふるさと納税、くじ、競馬など、「得する確率」が関わるあらゆる選択を、数字で検証する研究機関です。
        </p>
        <p>
          世の中には「当たりやすい」「還元率が高い」と謳うサイトが数多くありますが、その多くは運営側が提示する表示価格をそのまま採用しているにすぎません。当研究所では、実際に買取・換金した場合の価値（換金ベース）を基準に期待値・還元率を算出し、個別の商品（銘柄）単位で継続的に検証・追跡しています。
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H2>検証への取り組み方</H2>
        <p>当研究所が扱う数値には、次の3つの原則があります。</p>
        <div>
          <p className="font-bold">換金ベースで算出する</p>
          <p>運営側が公表する市場価格ではなく、実際の買取相場に基づいて期待値を計算します。表示価格と換金価格の乖離自体も、検証の対象です。</p>
        </div>
        <div>
          <p className="font-bold">損な商品も正直に書く</p>
          <p>期待値が低い、還元率が悪いと判断した商品は、そのまま「損」と明記します。特定の商品を持ち上げるための記事は書きません。</p>
        </div>
        <div>
          <p className="font-bold">計算式とデータの出どころを明示する</p>
          <p>すべての数値に、算出方法とデータの取得元・最終検証日を添えます。根拠を示さない断定はしません。</p>
        </div>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H2>運営者について</H2>
        <p>
          期待値研究所は、個人ではなく「期待値研究所」という組織名で運営しています。誌面には研究員キャラクター「キタイチ」（「期待値」の読みそのものが名前の由来です）が案内役として登場します。
        </p>
        <p className="italic">キタイチ：数字で語る場所です。</p>
      </section>

      <section className="mt-10 leading-relaxed">
        <H2>お問い合わせ</H2>
        <p>
          データの誤りのご指摘、掲載のご依頼などは、
          <Link href="/contact">お問い合わせページ</Link>
          からご連絡ください。
        </p>
      </section>
    </div>
  );
}
