// 03-architecture.md のスキーマに対応する型定義

export type KitaichiCategory = "oripa" | "box" | "furusato" | "lottery" | "keiba";

export type Item = {
  id: string;
  category: KitaichiCategory;
  store_id: string | null;
  item_name: string;
  slug: string;
  price: number;
  face_value: number;
  cash_value: number;
  expected_value: number;
  return_rate: number;
  source_url: string | null;
  verified_at: string;
  linked_content_id: string | null;
};

// microCMSの report / store コンテンツ共通フィールド
export type MicroCmsContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
};

export type Report = MicroCmsContent & {
  title: string;
  slug: string;
  body: string;
  category: KitaichiCategory;
};

export type Store = MicroCmsContent & {
  name: string;
  slug: string;
  review: string;
  category: KitaichiCategory;
};
