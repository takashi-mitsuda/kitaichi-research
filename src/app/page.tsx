import Link from "next/link";
import { getItemsByCategory, getRecentItemsByCategory } from "@/lib/items";
import { getReports, getStores } from "@/lib/microcms";

export const revalidate = 3600;

export default async function Home() {
  const [items, recentItems, reports, stores] = await Promise.all([
    getItemsByCategory("oripa"),
    getRecentItemsByCategory("oripa", 6),
    getReports({ filters: "category[equals]oripa", limit: 1 }),
    getStores({ filters: "category[equals]oripa", limit: 3 }),
  ]);

  const topItem = items[0];
  const topRanking = items.slice(0, 10);
  const pillarReport = reports.contents[0];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          勘ではなく、
          <br />
          期待値で選ぶ。
        </h1>
        <p className="mt-6 leading-relaxed text-ink/70">
          オリパ・カードBOX・ふるさと納税・くじ・競馬など、「得する確率」が関わる選択を、数字で検証するリサーチメディアです。
          表示価格ではなく、実際に買取・換金した場合の価値（換金ベース）を基準に期待値・還元率を算出しています。
        </p>

        {topItem ? (
          <p className="mt-8 border-y border-ink/10 py-4 text-sm">
            現在の最高還元率：
            <Link href={`/oripa/item/${topItem.slug}`} className="font-bold text-vermillion">
              {topItem.item_name} {topItem.return_rate.toFixed(1)}%
            </Link>
            （換金ベース）
          </p>
        ) : (
          <p className="mt-8 border-y border-ink/10 py-4 text-sm text-ink/50">
            データ準備中です（Supabase接続後、検証済みの還元率がここに表示されます）。
          </p>
        )}

        <Link
          href="/oripa"
          className="mt-8 inline-block rounded bg-ink px-6 py-3 font-bold text-paper"
        >
          オリパ研究部門を見る
        </Link>
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">換金ベース還元率ランキング TOP10</h2>
          <Link href="/oripa/ranking" className="text-sm">
            すべて見る →
          </Link>
        </div>
        {topRanking.length === 0 ? (
          <p className="mt-4 text-sm text-ink/50">データ準備中です（Supabase接続後に表示されます）。</p>
        ) : (
          <ol className="mt-4 divide-y divide-ink/10">
            {topRanking.map((item, index) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <span className="flex items-center gap-3">
                  <span className="w-6 text-ink/40">{index + 1}</span>
                  <Link href={`/oripa/item/${item.slug}`}>{item.item_name}</Link>
                </span>
                <span className="font-bold text-vermillion">{item.return_rate.toFixed(1)}%</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mt-20 max-w-2xl">
        <h2 className="text-xl font-bold">なぜ期待値研究所か</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-ink/80">
          <p>
            多くのオリパ比較サイトは、運営側が提示する表示価格をそのまま還元率の計算に使っています。当研究所では、実際に買取・換金した場合の価値（換金ベース）を基準に算出し、損な商品も正直に「損」と書きます。
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

      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">サイト評価</h2>
          <Link href="/oripa/store" className="text-sm">
            すべて見る →
          </Link>
        </div>
        {stores.contents.length === 0 ? (
          <p className="mt-4 text-sm text-ink/50">評価記事準備中です（microCMS接続後に表示されます）。</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {stores.contents.map((store) => (
              <Link key={store.id} href={`/oripa/store/${store.slug}`} className="border border-ink/10 p-4 font-bold">
                {store.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-20">
        <h2 className="text-xl font-bold">個別ガチャEV 新着</h2>
        {recentItems.length === 0 ? (
          <p className="mt-4 text-sm text-ink/50">データ準備中です（Supabase接続後に表示されます）。</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
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

      <p className="mt-20 text-sm text-ink/50">
        オリパ研究部門を皮切りに、カードBOX・ふるさと納税・くじ・競馬など他ジャンルへの展開も準備中です。
      </p>

      <section className="mt-8 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2">
        <Link href="/about" className="border border-ink/10 p-6">
          <p className="font-bold">研究所について</p>
          <p className="mt-2 text-sm text-ink/60">運営体制・検証への取り組み方</p>
        </Link>
        <Link href="/policy" className="border border-ink/10 p-6">
          <p className="font-bold">免責事項・データ検証ポリシー</p>
          <p className="mt-2 text-sm text-ink/60">数値の算出方法・データの取得元</p>
        </Link>
      </section>
    </div>
  );
}
