-- 期待値研究所: items テーブル（03-architecture.md のスキーマに対応）
-- Supabase SQL Editorで実行する

create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('oripa', 'box', 'furusato', 'lottery', 'keiba')),
  slug text not null unique,
  store_id uuid,
  item_name text not null,
  price integer not null,
  face_value integer not null,
  cash_value integer not null,
  expected_value integer not null,
  return_rate numeric not null,
  source_url text,
  verified_at date not null,
  linked_content_id text,
  created_at timestamptz not null default now()
);

create index if not exists items_category_return_rate_idx on items (category, return_rate desc);
create index if not exists items_slug_idx on items (slug);

alter table items enable row level security;

-- 公開ページからの読み取りのみ許可（書き込みはservice roleキー経由、RLSをバイパスするので個別ポリシー不要）
create policy "items are publicly readable" on items
  for select
  using (true);
