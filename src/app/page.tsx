import Link from "next/link";
import { getItemsByCategory, getRecentItemsByCategory } from "@/lib/items";
import { getReports, getStores } from "@/lib/microcms";
import { Button } from "@/components/ui/Button";
import { Eyebrow, HeroHeading, H2 } from "@/components/ui/Heading";
import { HeroBackground } from "@/components/HeroBackground";

export const revalidate = 3600;

export default async function Home() {
  const [items, recentItems, reports, stores] = await Promise.all([
    getItemsByCategory("oripa"),
    getRecentItemsByCategory("oripa", 6),
    getReports({ filters: "category[contains]oripa", limit: 1 }),
    getStores({ filters: "category[contains]oripa", limit: 3 }),
  ]);

  const topItem = items[0];
  const topRanking = items.slice(0, 10);
  const pillarReport = reports.contents[0];

  return (
    <div>
      {/* ヒーローのみmax-w-4xlの外側に出し、背景を画面幅いっぱいに広げる。テキストは内側のmx-auto max-w-4xlで他セクションと同じ位置に揃える */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <HeroBackground targetRate={topItem?.return_rate} />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <div className="max-w-2xl">
            <div className="animate-fade-up">
              <Eyebrow>KITAICHI RESEARCH</Eyebrow>
            </div>
            <div className="animate-fade-up mt-4" style={{ animationDelay: "0.08s" }}>
              <HeroHeading>
                勘ではなく、
                <br />
                期待値で選ぶ。
              </HeroHeading>
            </div>
            <p
              className="animate-fade-up mt-6 leading-relaxed text-ink/70"
              style={{ animationDelay: "0.16s" }}
            >
              オリパの「得する確率」を、数字で検証するリサーチメディアです。
              表示価格ではなく、実際に買取・換金した場合の価値（換金ベース）を基準に期待値・還元率を算出しています。
            </p>

            <div className="animate-fade-up mt-8" style={{ animationDelay: "0.24s" }}>
              {/* 運営会社ランキング記事(26-draft-report-store-ranking.md)は未公開のため、
                  代わりに現状最も近いサイト評価一覧にリンクしている。公開後は差し替える */}
              <Button href="/oripa/store">サイト評価を見る</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <section className="mt-16 sm:mt-20">
          <H2>還元率・期待値が高いオリパの記事</H2>
          {topRanking.length === 0 ? (
            <p className="mt-4 text-sm text-ink/50">データ準備中です（Supabase接続後に表示されます）。</p>
          ) : (
            <>
              <ol className="mt-6 divide-y divide-ink/10">
                {topRanking.map((item, index) => (
                  <li key={item.id} className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-3">
                      <span className="w-6 text-ink/50">{index + 1}</span>
                      <Link href={`/oripa/item/${item.slug}`}>{item.item_name}</Link>
                    </span>
                    <span className="font-bold text-vermillion">{item.return_rate.toFixed(1)}%</span>
                  </li>
                ))}
              </ol>
              <Link href="/oripa/ranking" className="mt-4 block text-right text-sm">
                すべて見る →
              </Link>
            </>
          )}
        </section>

        <section className="mt-16 max-w-2xl sm:mt-20">
          <H2>期待値研究所とは</H2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink/70">
            <p>
              多くの他オリパ比較サイトでは、運営の比較や当選報告の口コミ掲載など、定量的に比較することが難しいことに課題があると思います。
            </p>
            <p>
              当サイトでは、買取・換金した場合の金額を基準にオリパの期待値を算出し、同じ基準で「どこのサイトが得なのか？」をわかりやすくすることを目指しています。
            </p>
            <p>
              また、損なオリパも正直に「損」と書くようにしています。
              <br />
              どこかのサイトを有利に記載することもしません。
            </p>
            <p>すべての数値に計算式とデータの取得元・最終検証日を添え、根拠を示さない断定はしません。</p>
          </div>
          {pillarReport ? (
            <Link href={`/oripa/report/${pillarReport.slug}`} className="mt-4 inline-block font-bold">
              {pillarReport.title} →
            </Link>
          ) : (
            <p className="mt-4 text-sm text-ink/50">計算方法の解説記事は準備中です。</p>
          )}
        </section>

        <section className="mt-16 sm:mt-20">
          <H2>サイト評価</H2>
          {stores.contents.length === 0 ? (
            <p className="mt-4 text-sm text-ink/50">評価記事準備中です（microCMS接続後に表示されます）。</p>
          ) : (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stores.contents.map((store) => (
                  <Link key={store.id} href={`/oripa/store/${store.slug}`} className="border border-ink/10 p-4 font-bold">
                    {store.name}
                  </Link>
                ))}
              </div>
              <Link href="/oripa/store" className="mt-4 block text-right text-sm">
                すべて見る →
              </Link>
            </>
          )}
        </section>

        <section className="mt-16 sm:mt-20">
          <H2>個別ガチャEV 新着</H2>
          {recentItems.length === 0 ? (
            <p className="mt-4 text-sm text-ink/50">データ準備中です（Supabase接続後に表示されます）。</p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {recentItems.map((item) => (
                <Link key={item.id} href={`/oripa/item/${item.slug}`} className="border border-ink/10 p-4">
                  <p className="font-bold">{item.item_name}</p>
                  <p className="mt-1 text-sm text-ink/50">{item.verified_at}</p>
                  <p className="mt-2 font-bold text-vermillion">{item.return_rate.toFixed(1)}%</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <p className="mt-16 text-sm text-ink/50 sm:mt-20">
          オリパ研究部門を皮切りに、カードBOX・ふるさと納税・くじ・競馬など他ジャンルへの展開も準備中です。
        </p>

        <section className="mt-8 grid gap-4 border-t border-ink/10 pb-16 pt-8 sm:grid-cols-2 sm:pb-20">
          <Link href="/about" className="border border-ink/10 p-6">
            <p className="font-bold">研究所について</p>
            <p className="mt-2 text-sm text-ink/50">運営体制・検証への取り組み方</p>
          </Link>
          <Link href="/policy" className="border border-ink/10 p-6">
            <p className="font-bold">免責事項・データ検証ポリシー</p>
            <p className="mt-2 text-sm text-ink/50">数値の算出方法・データの取得元</p>
          </Link>
        </section>
      </div>
    </div>
  );
}
