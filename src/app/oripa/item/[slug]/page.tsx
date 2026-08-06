import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getItemBySlug } from "@/lib/items";

export const revalidate = 3600;

export async function generateStaticParams() {
  if (!isSupabaseConfigured) return [];
  const { data } = await supabase.from("items").select("slug").eq("category", "oripa");
  return (data ?? []).map((row) => ({ slug: row.slug as string }));
}

export async function generateMetadata(props: PageProps<"/oripa/item/[slug]">) {
  const { slug } = await props.params;
  const item = await getItemBySlug(slug);
  return { title: item ? `${item.item_name}の期待値` : "個別ガチャの期待値" };
}

export default async function ItemPage(props: PageProps<"/oripa/item/[slug]">) {
  const { slug } = await props.params;
  const item = await getItemBySlug(slug);

  if (!item) notFound();

  const rows: Array<[string, string]> = [
    ["参加価格", `${item.price.toLocaleString()}円`],
    ["表示価格ベース当選価値", `${item.face_value.toLocaleString()}円`],
    ["換金ベース当選価値", `${item.cash_value.toLocaleString()}円`],
    ["期待値（換金ベース）", `${item.expected_value.toLocaleString()}円`],
    ["還元率（換金ベース）", `${item.return_rate.toFixed(1)}%`],
    ["最終検証日", item.verified_at],
  ];

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold">{item.item_name}</h1>
      <p className="mt-2 text-sm text-ink/60">期待値・還元率は換金ベースで算出しています。詳細は<Link href="/policy">データ検証ポリシー</Link>参照。</p>

      <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between py-3">
            <dt className="text-ink/60">{label}</dt>
            <dd className="font-bold">{value}</dd>
          </div>
        ))}
      </dl>

      {item.source_url && (
        <p className="mt-6 text-sm">
          データ取得元：
          <a href={item.source_url} target="_blank" rel="noopener noreferrer">
            {item.source_url}
          </a>
        </p>
      )}
    </article>
  );
}
