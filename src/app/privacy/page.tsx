import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { H1, H3 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <Container>
      <H1>プライバシーポリシー</H1>

      <p className="mt-8 leading-relaxed">
        期待値研究所（以下「当サイト」といいます）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
      </p>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H3 as="h2">個人情報の取得について</H3>
        <p>当サイトでは、お問い合わせフォームをご利用いただく際に、お名前・メールアドレス等の個人情報をご入力いただく場合があります。</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H3 as="h2">個人情報の利用目的</H3>
        <p>取得した個人情報は、お問い合わせへの回答、必要な情報のご案内のためにのみ利用し、これらの目的以外では利用しません。</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H3 as="h2">アクセス解析ツールについて</H3>
        <p>
          当サイトでは、Googleが提供する「Googleアナリティクス」を利用しています。Googleアナリティクスはトラフィックデータの収集のためにCookieを使用しますが、これらのデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することができます。詳しくは
          <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">
            Googleアナリティクス利用規約
          </a>
          をご確認ください。
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H3 as="h2">広告配信について</H3>
        <p>
          当サイトは、第三者配信の広告サービス（Googleアドセンス等）を利用する場合があります。このような広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。Cookieを無効にする方法や、Googleアドセンスに関する詳細は
          <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">
            広告 – ポリシーと規約 – Google
          </a>
          をご確認ください。
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H3 as="h2">個人情報の第三者提供について</H3>
        <p>当サイトは、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H3 as="h2">個人情報の開示・訂正・削除について</H3>
        <p>
          ご本人からの個人情報の開示・訂正・削除等のご希望があった場合には、ご本人であることを確認の上、合理的な期間内に対応いたします。ご希望の際は
          <Link href="/contact">お問い合わせページ</Link>
          よりご連絡ください。
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H3 as="h2">プライバシーポリシーの変更について</H3>
        <p>当サイトは、法令等を踏まえ、本ポリシーの内容を予告なく変更することがあります。変更後のプライバシーポリシーは、当ページに掲載した時点から効力を生じるものとします。</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <H3 as="h2">お問い合わせ窓口</H3>
        <p>
          本ポリシーに関するお問い合わせは、<Link href="/contact">お問い合わせページ</Link>
          よりご連絡ください。
        </p>
      </section>

      <p className="mt-10 text-sm text-ink/50">
        制定日：2026年7月15日
        <br />
        最終更新日：2026年7月15日
      </p>
    </Container>
  );
}
