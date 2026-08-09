import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://kitaichi-research.com";

// 公開準備が整うまではnoindex（旧WordPress版から引き継いだ方針）。
// 本番公開前チェック（06-todo.md Phase 5）でallow: "/" に戻すこと。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
