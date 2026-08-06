import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { Report, Store } from "@/types/kitaichi";

export const isMicroCmsConfigured = Boolean(
  process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY,
);

const client = isMicroCmsConfigured
  ? createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
      apiKey: process.env.MICROCMS_API_KEY!,
    })
  : null;

// microCMS未接続の開発段階でもページの表示・ビルドを止めないためのガード
export async function getReports(queries?: MicroCMSQueries) {
  if (!client) return { contents: [] as Report[], totalCount: 0, offset: 0, limit: 0 };
  return client.getList<Report>({ endpoint: "reports", queries });
}

export async function getReportBySlug(slug: string) {
  if (!client) return null;
  const { contents } = await client.getList<Report>({
    endpoint: "reports",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  return contents[0] ?? null;
}

export async function getStores(queries?: MicroCMSQueries) {
  if (!client) return { contents: [] as Store[], totalCount: 0, offset: 0, limit: 0 };
  return client.getList<Store>({ endpoint: "stores", queries });
}

export async function getStoreBySlug(slug: string) {
  if (!client) return null;
  const { contents } = await client.getList<Store>({
    endpoint: "stores",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  return contents[0] ?? null;
}
