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
  // カード型リンクのサムネイル用(0002_items_add_thumbnail.sqlで追加、未設定ならnull)
  thumbnail_url?: string | null;
};

// microCMSの画像フィールドの標準的なレスポンス形状
export type MicroCmsImage = {
  url: string;
  width: number;
  height: number;
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
  // microCMSのセレクトフィールドは複数選択形式のため配列で返る
  category: KitaichiCategory[];
  // サムネイル画像フィールド(未設定の記事も多いためoptional)
  thumbnail?: MicroCmsImage;
};

export type Store = MicroCmsContent & {
  name: string;
  slug: string;
  review: string;
  // microCMSのセレクトフィールドは複数選択形式のため配列で返る
  category: KitaichiCategory[];
  // サムネイル画像フィールド(未設定の記事も多いためoptional)
  thumbnail?: MicroCmsImage;
};
