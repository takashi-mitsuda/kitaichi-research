import { notFound } from "next/navigation";
import { getStoreBySlug, getStores } from "@/lib/microcms";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { contents } = await getStores({ limit: 100, filters: "category[equals]oripa" });
  return contents.map((store) => ({ slug: store.slug }));
}

export async function generateMetadata(props: PageProps<"/oripa/store/[slug]">) {
  const { slug } = await props.params;
  const store = await getStoreBySlug(slug);
  return { title: store?.name ?? "サイト評価" };
}

export default async function StorePage(props: PageProps<"/oripa/store/[slug]">) {
  const { slug } = await props.params;
  const store = await getStoreBySlug(slug);

  if (!store) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-bold">{store.name}</h1>
      <div className="prose prose-neutral mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: store.review }} />
    </article>
  );
}
