import { notFound } from "next/navigation";
import { getReportBySlug, getReports } from "@/lib/microcms";
import { H1 } from "@/components/ui/Heading";

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

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <H1>{report.title}</H1>
      <div className="prose prose-neutral mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: report.body }} />
    </article>
  );
}
