import { notFound } from "next/navigation";
import Script from "next/script";
import { getStoreBySlug, getStores } from "@/lib/microcms";
import { H1 } from "@/components/ui/Heading";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { contents } = await getStores({ limit: 100, filters: "category[contains]oripa" });
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
      <H1>{store.name}</H1>
      <div className="prose prose-neutral mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: store.review }} />
      {/* 本文中にX(Twitter)の当選報告埋め込み(blockquote)があればレンダリングする */}
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
    </article>
  );
}
