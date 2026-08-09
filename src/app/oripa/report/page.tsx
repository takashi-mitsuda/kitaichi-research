import type { Metadata } from "next";
import Link from "next/link";
import { getReports } from "@/lib/microcms";
import { H1 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "解説記事一覧",
  description: "オリパの期待値・還元率の計算方法や検証プロセスを解説する記事一覧。",
};

export const revalidate = 3600;

export default async function ReportListPage() {
  const reports = await getReports({ filters: "category[contains]oripa", limit: 100 });

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <H1>解説記事一覧</H1>
      <p className="mt-3 text-sm text-ink/70">
        期待値・還元率の考え方や算出方法を解説するピラー記事です。
      </p>

      {reports.contents.length === 0 ? (
        <p className="mt-8 text-sm text-ink/50">記事準備中です（microCMS接続後に表示されます）。</p>
      ) : (
        <ul className="mt-8 divide-y divide-ink/10">
          {reports.contents.map((report) => (
            <li key={report.id} className="py-4">
              <Link href={`/oripa/report/${report.slug}`} className="font-bold">
                {report.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
