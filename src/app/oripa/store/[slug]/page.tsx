import { notFound } from "next/navigation";
import Script from "next/script";
import { getStoreBySlug, getStores } from "@/lib/microcms";
import { extractToc } from "@/lib/toc";
import { formatDateJa } from "@/lib/date";
import { Container } from "@/components/ui/Container";
import { H1 } from "@/components/ui/Heading";
import { TableOfContents } from "@/components/ui/TableOfContents";

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

  const { html, toc } = extractToc(store.review);

  return (
    <Container as="article">
      <H1>{store.name}</H1>
      <p className="mt-2 text-sm text-ink/50">最終更新日：{formatDateJa(store.updatedAt)}</p>
      <TableOfContents items={toc} />
      <div className="prose mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      {/* 本文中にX(Twitter)の当選報告埋め込み(blockquote)があればレンダリングする */}
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
    </Container>
  );
}
