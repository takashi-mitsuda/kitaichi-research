import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Item, KitaichiCategory } from "@/types/kitaichi";

// Supabase未接続の開発段階でもページの表示・ビルドを止めないためのガード
export async function getItemsByCategory(category: KitaichiCategory): Promise<Item[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("category", category)
    .order("return_rate", { ascending: false });
  if (error) {
    console.error("getItemsByCategory failed", error);
    return [];
  }
  return data ?? [];
}

export async function getItemBySlug(slug: string): Promise<Item | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase.from("items").select("*").eq("slug", slug).single();
  if (error) {
    console.error("getItemBySlug failed", error);
    return null;
  }
  return data;
}
