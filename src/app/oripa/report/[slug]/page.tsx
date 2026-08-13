import { notFound } from "next/navigation";
import { getReportBySlug, getReports } from "@/lib/microcms";
import { extractToc } from "@/lib/toc";
import { formatDateJa } from "@/lib/date";
import { Container } from "@/components/ui/Container";
import { H1 } from "@/components/ui/Heading";
import { TableOfContents } from "@/components/ui/TableOfContents";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { contents } = await getReports({ limit: 100, filters: "category[contains]oripa" });
  return contents.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata(props: PageProps<"/oripa/report/[slug]">) {
  const { slug } = await props.params;
  const report = await getReportBySlug(slug);
  return { title: report?.title ?? "解説記事" };
}

export default async function ReportPage(props: PageProps<"/oripa/report/[slug]">) {
  const { slug } = await props.params;
  const report = await getReportBySlug(slug);

  if (!report) notFound();

  const { html, toc } = extractToc(report.body);

  return (
    <Container as="article">
      <H1>{report.title}</H1>
      <p className="mt-2 text-sm text-ink/50">最終更新日：{formatDateJa(report.updatedAt)}</p>
      <TableOfContents items={toc} />
      <div className="prose mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
}
