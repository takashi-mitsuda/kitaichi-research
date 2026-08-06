import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-6 py-24">
      <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
        勘ではなく、
        <br />
        期待値で選ぶ。
      </h1>
      <p className="mt-6 leading-relaxed text-ink/70">
        オリパ・カードBOX・ふるさと納税・くじ・競馬など、「得する確率」が関わる選択を、数字で検証するリサーチメディアです。
        表示価格ではなく、実際に買取・換金した場合の価値（換金ベース）を基準に期待値・還元率を算出しています。
      </p>
      <Link
        href="/oripa"
        className="mt-10 inline-block rounded bg-ink px-6 py-3 font-bold text-paper"
      >
        オリパ研究部門を見る
      </Link>
    </div>
  );
}
