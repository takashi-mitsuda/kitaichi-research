import Image from "next/image";

// カード型リンクのサムネイル。画像URLが無い場合(まだCMS/DBにサムネイル項目の運用が
// 無いケース)は、ロゴマークを薄く配置したプレースホルダーを表示する。
export function Thumbnail({ src, alt }: { src?: string | null; alt: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- CMS/DBの画像ドメインが未確定のためnext/imageのremotePatterns設定を避ける
    return <img src={src} alt={alt} className="aspect-[4/3] w-full border-b border-ink/10 object-cover" />;
  }
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center border-b border-ink/10 bg-ink/5">
      <Image src="/logo-mark.png" alt="" width={40} height={40} className="h-10 w-10 opacity-20" />
    </div>
  );
}
