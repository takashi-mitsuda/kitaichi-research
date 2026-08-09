import type { MetadataRoute } from "next";
import { getItemsByCategory } from "@/lib/items";
import { getReports, getStores } from "@/lib/microcms";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitaichi-research.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [items, reports, stores] = await Promise.all([
    getItemsByCategory("oripa"),
    getReports({ limit: 100, filters: "category[contains]oripa" }),
    getStores({ limit: 100, filters: "category[contains]oripa" }),
  ]);

  const staticRoutes = ["", "/oripa", "/oripa/ranking", "/about", "/policy", "/privacy", "/contact"].map(
    (path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() }),
  );

  const itemRoutes = items.map((item) => ({
    url: `${baseUrl}/oripa/item/${item.slug}`,
    lastModified: new Date(item.verified_at),
  }));

  const reportRoutes = reports.contents.map((report) => ({
    url: `${baseUrl}/oripa/report/${report.slug}`,
    lastModified: new Date(report.updatedAt),
  }));

  const storeRoutes = stores.contents.map((store) => ({
    url: `${baseUrl}/oripa/store/${store.slug}`,
    lastModified: new Date(store.updatedAt),
  }));

  return [...staticRoutes, ...itemRoutes, ...reportRoutes, ...storeRoutes];
}
