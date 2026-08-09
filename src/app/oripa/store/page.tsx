import type { Metadata } from "next";
import Link from "next/link";
import { getStores } from "@/lib/microcms";
import { H1 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "サイト評価一覧",
  description: "オリパ運営会社・プラットフォームの安全性・発送・実績を評価する記事一覧。",
};

export const revalidate = 3600;

export default async function StoreListPage() {
  const stores = await getStores({ filters: "category[contains]oripa", limit: 100 });

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <H1>サイト評価一覧</H1>
      <p className="mt-3 text-sm text-ink/70">
        オリパ運営会社・プラットフォーム単位の評価記事です。
      </p>

      {stores.contents.length === 0 ? (
        <p className="mt-8 text-sm text-ink/50">評価記事準備中です（microCMS接続後に表示されます）。</p>
      ) : (
        <ul className="mt-8 divide-y divide-ink/10">
          {stores.contents.map((store) => (
            <li key={store.id} className="py-4">
              <Link href={`/oripa/store/${store.slug}`} className="font-bold">
                {store.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
