# 期待値研究所 (kitaichi-research.com)

Next.js + microCMS + Supabase + Vercelで構築するメディアサイト。設計・移行の経緯は親ディレクトリの[`../README.md`](../README.md)と[`../18-migration-to-vercel.md`](../18-migration-to-vercel.md)を参照。

## セットアップ

```bash
npm install
cp .env.local.example .env.local  # 値はSupabase/microCMS/Resendのダッシュボードから取得して埋める
npm run dev
```

外部サービス未接続の状態でも`npm run dev`/`npm run build`は通り、データ依存箇所は「準備中」表示になる。

## 構成

- `src/app/` — App Router。`/oripa/` 配下がオリパ研究部門（現在の実装対象部門）
- `src/lib/supabase.ts` `src/lib/microcms.ts` `src/lib/email.ts` — 外部サービスクライアント。いずれも未接続時はフォールバックしてエラーにならない
- `src/types/kitaichi.ts` — DB/CMSのコンテンツモデル型定義
- `supabase/migrations/0001_items.sql` — Supabase SQL Editorで実行するスキーマ

## デプロイ

Vercelに接続後、`.env.local`と同じ環境変数をVercelのProject Settings > Environment Variablesに設定する。
