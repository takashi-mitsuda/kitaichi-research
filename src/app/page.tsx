import Link from "next/link";
import { getItemsByCategory, getRecentItemsByCategory } from "@/lib/items";
import { getReports, getStores } from "@/lib/microcms";
import { Button } from "@/components/ui/Button";
import { Eyebrow, HeroHeading, H2 } from "@/components/ui/Heading";
import { HeroBackground } from "@/components/HeroBackground";
import { Thumbnail } from "@/components/ui/Thumbnail";
import { Panel } from "@/components/ui/Panel";

export const revalidate = 3600;

export default async function Home() {
  const [items, recentItems, reports, stores] = await Promise.all([
    getItemsByCategory("oripa"),
    getRecentItemsByCategory("oripa", 6),
    getReports({ filters: "category[contains]oripa", limit: 1 }),
    getStores({ filters: "category[contains]oripa", limit: 3 }),
  ]);

  const topItem = items[0];
  const topRanking = items.slice(0, 6);
  const pillarReport = reports.contents[0];

  return (
    <div>
      {/* ヒーローのみmax-w-4xlの外側に出し、背景を画面幅いっぱいに広げる。テキストは内側のmx-auto max-w-4xlで他セクションと同じ位置に揃える */}
      {/* pt-24/32はヘッダー分の余白+ページ内で最も広い区切りとして残すが、pbは付けない。
          ヒーロー下の余白は次のセクションのmt-16 sm:mt-20だけで作り、他セクション間と同じ間隔に揃える
          (pyで上下対称だと、ヒーローのpb+次セクションのmtが足し算され、ヒーロー上より広くなってしまうため) */}
      <section className="relative overflow-hidden pt-24 sm:pt-32">
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
              <p className="mb-3 italic text-ink/60">どこの会社が一番お得なの？</p>
              {/* 運営会社ランキング記事(26-draft-report-store-ranking.md)は未公開のため、
                  代わりに現状最も近いオリパ会社比較(サイトごとの評価)一覧にリンクしている。公開後は差し替える */}
              <Button href="/oripa/store">オリパ会社の比較を見る</Button>
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
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {topRanking.map((item, index) => (
                  <Link key={item.id} href={`/oripa/item/${item.slug}`} className="group relative border border-ink/10">
                    <span className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center bg-ink text-xs font-bold text-paper">
                      {index + 1}
                    </span>
                    <Thumbnail src={item.thumbnail_url} alt={item.item_name} />
                    <div className="p-4">
                      <p className="font-bold group-hover:text-vermillion">{item.item_name}</p>
                      <p className="mt-2 font-bold text-vermillion">{item.return_rate.toFixed(1)}%</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/oripa/ranking" className="mt-4 block text-right text-sm">
                すべて見る →
              </Link>
            </>
          )}
        </section>

        <section className="mt-16 max-w-2xl sm:mt-20">
          <H2>期待値研究所とは</H2>
          <Panel className="mt-6 space-y-4 leading-relaxed text-ink/70">
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
          </Panel>
          {pillarReport ? (
            <Link href={`/oripa/report/${pillarReport.slug}`} className="mt-4 inline-block font-bold">
              {pillarReport.title} →
            </Link>
          ) : (
            <p className="mt-4 text-sm text-ink/50">計算方法の解説記事は準備中です。</p>
          )}
        </section>

        <section className="mt-16 sm:mt-20">
          <H2>サイトごとの評価</H2>
          {stores.contents.length === 0 ? (
            <p className="mt-4 text-sm text-ink/50">評価記事準備中です（microCMS接続後に表示されます）。</p>
          ) : (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stores.contents.map((store) => (
                  <Link key={store.id} href={`/oripa/store/${store.slug}`} className="group border border-ink/10">
                    <Thumbnail src={store.thumbnail?.url} alt={store.name} />
                    <p className="p-4 font-bold group-hover:text-vermillion">{store.name}</p>
                  </Link>
                ))}
              </div>
              <Link href="/oripa/store" className="mt-4 block text-right text-sm">
                すべて見る →
              </Link>
            </>
          )}
        </section>

        <section className="mt-16 pb-16 sm:mt-20 sm:pb-20">
          <H2>新着記事</H2>
          {recentItems.length === 0 ? (
            <p className="mt-4 text-sm text-ink/50">データ準備中です（Supabase接続後に表示されます）。</p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {recentItems.map((item) => (
                <Link key={item.id} href={`/oripa/item/${item.slug}`} className="group border border-ink/10">
                  <Thumbnail src={item.thumbnail_url} alt={item.item_name} />
                  <div className="p-4">
                    <p className="font-bold group-hover:text-vermillion">{item.item_name}</p>
                    <p className="mt-1 text-sm text-ink/50">{item.verified_at}</p>
                    <p className="mt-2 font-bold text-vermillion">{item.return_rate.toFixed(1)}%</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
