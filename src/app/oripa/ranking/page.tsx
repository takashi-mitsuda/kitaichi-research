import type { Metadata } from "next";
import Link from "next/link";
import { getItemsByCategory } from "@/lib/items";

export const metadata: Metadata = {
  title: "オリパ換金ベース還元率ランキング",
  description: "オリパの換金ベース還元率ランキング。表示価格ではなく実際の買取・換金価値を基準に算出。",
};

export const revalidate = 3600;

export default async function OripaRankingPage() {
  const items = await getItemsByCategory("oripa");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-2xl font-bold">オリパ 換金ベース還元率ランキング</h1>
      <p className="mt-3 text-sm text-ink/70">
        運営側が提示する表示価格ではなく、実際の買取・換金価値（cash_value）を基準に算出した還元率のランキングです。算出方法は
        <Link href="/policy">免責事項・データ検証ポリシー</Link>
        をご確認ください。
      </p>

      {items.length === 0 ? (
        <p className="mt-8 text-sm text-ink/50">データ準備中です（Supabase接続後に表示されます）。</p>
      ) : (
        <table className="mt-8 w-full text-sm">
          <thead>
            <tr className="border-b border-ink/20 text-left">
              <th className="py-2">順位</th>
              <th className="py-2">銘柄</th>
              <th className="py-2">参加価格</th>
              <th className="py-2">還元率</th>
              <th className="py-2">最終検証日</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-ink/10">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">
                  <Link href={`/oripa/item/${item.slug}`}>{item.item_name}</Link>
                </td>
                <td className="py-2">{item.price.toLocaleString()}円</td>
                <td className="py-2 font-bold text-vermillion">{item.return_rate.toFixed(1)}%</td>
                <td className="py-2 text-ink/50">{item.verified_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
