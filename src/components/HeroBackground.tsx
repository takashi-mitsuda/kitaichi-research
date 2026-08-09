// トップページのヒーロー背景。サイトが実際に使う数字・記号(計算メモ風)がごく淡くゆっくり上へ流れる。
// 位置・速度は固定値でハードコードし、サーバーコンポーネントのまま(クライアントJS不要)にしている。
const TOKENS: Array<{
  text: string;
  left: string;
  duration: string;
  delay: string;
  size: string;
  opacity: number;
}> = [
  { text: "73.2%", left: "4%", duration: "22s", delay: "0s", size: "text-2xl", opacity: 0.08 },
  { text: "÷", left: "15%", duration: "16s", delay: "3s", size: "text-4xl", opacity: 0.06 },
  { text: "1/8192", left: "25%", duration: "24s", delay: "8s", size: "text-lg", opacity: 0.07 },
  { text: "×", left: "37%", duration: "18s", delay: "1s", size: "text-3xl", opacity: 0.06 },
  { text: "46%", left: "47%", duration: "20s", delay: "11s", size: "text-xl", opacity: 0.08 },
  { text: "=", left: "57%", duration: "17s", delay: "4s", size: "text-3xl", opacity: 0.06 },
  { text: "88.4%", left: "67%", duration: "23s", delay: "9s", size: "text-2xl", opacity: 0.07 },
  { text: "3,585円", left: "77%", duration: "21s", delay: "2s", size: "text-lg", opacity: 0.07 },
  { text: "還元率", left: "87%", duration: "19s", delay: "13s", size: "text-xl", opacity: 0.06 },
  { text: "÷", left: "93%", duration: "15s", delay: "6s", size: "text-2xl", opacity: 0.06 },
  { text: "50%", left: "10%", duration: "25s", delay: "16s", size: "text-lg", opacity: 0.07 },
  { text: "×", left: "61%", duration: "14s", delay: "14s", size: "text-2xl", opacity: 0.06 },
];

export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {TOKENS.map((token, index) => (
        <span
          key={index}
          className={`hero-drift absolute bottom-0 font-bold text-ink ${token.size}`}
          style={{
            left: token.left,
            animationDuration: token.duration,
            animationDelay: token.delay,
            ["--drift-opacity" as string]: token.opacity,
          }}
        >
          {token.text}
        </span>
      ))}
    </div>
  );
}
