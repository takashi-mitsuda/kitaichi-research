import type { Metadata } from "next";
import Link from "next/link";
import { getItemsByCategory } from "@/lib/items";
import { getReports, getStores } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "オリパ研究部門",
  description: "オリパの期待値・還元率を換金ベースで検証するオリパ研究部門トップ。",
};

export default async function OripaTopPage() {
  const [items, reports, stores] = await Promise.all([
    getItemsByCategory("oripa"),
    getReports({ filters: "category[contains]oripa", limit: 6 }),
    getStores({ filters: "category[contains]oripa", limit: 6 }),
  ]);

  const topRanking = items.slice(0, 10);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold">オリパ研究部門</h1>
      <p className="mt-3 text-ink/70">オリパの期待値を見るならここ。換金ベースの還元率で、数字だけを見て選べます。</p>

      <section className="mt-12">
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

      <section className="mt-12 grid gap-8 sm:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold">解説記事</h2>
            <Link href="/oripa/report" className="text-sm">
              すべて見る →
            </Link>
          </div>
          {reports.contents.length === 0 ? (
            <p className="mt-4 text-sm text-ink/50">記事準備中です（microCMS接続後に表示されます）。</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {reports.contents.map((report) => (
                <li key={report.id}>
                  <Link href={`/oripa/report/${report.slug}`}>{report.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-bold">サイト評価</h2>
            <Link href="/oripa/store" className="text-sm">
              すべて見る →
            </Link>
          </div>
          {stores.contents.length === 0 ? (
            <p className="mt-4 text-sm text-ink/50">評価記事準備中です（microCMS接続後に表示されます）。</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {stores.contents.map((store) => (
                <li key={store.id}>
                  <Link href={`/oripa/store/${store.slug}`}>{store.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
