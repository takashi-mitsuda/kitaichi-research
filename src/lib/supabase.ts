import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const svcRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Supabaseプロジェクト未接続でもビルド・開発を止めないためのダミーURL
const placeholderUrl = "https://placeholder.supabase.co";
const placeholderKey = "placeholder";

// 読み取り用（クライアント/サーバー両方で利用可）
export const supabase = createClient(url || placeholderUrl, anon || placeholderKey);

// 書き込み用（サーバーサイド専用、service roleキーを使うのでAPI Route/Server Actionでのみ使うこと）
export const supabaseAdmin = createClient(url || placeholderUrl, svcRole || placeholderKey);

export const isSupabaseConfigured = Boolean(url && anon);
