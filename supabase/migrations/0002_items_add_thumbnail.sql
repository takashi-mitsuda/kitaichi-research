-- 期待値研究所: items テーブルにサムネイル画像URLを追加
-- ホームのカード型リンク(新着記事・還元率ランキング)用。Supabase SQL Editorで実行する

alter table items add column if not exists thumbnail_url text;
