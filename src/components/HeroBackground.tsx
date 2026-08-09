// トップページのヒーロー背景。方眼紙・検証用紙の罫線のような細い横線が、
// 濃淡を変えながらゆっくり左右に流れる。translateXをvw単位で動かすため、
// 画面幅に関わらず安定して見える(数字ドリフト版でモバイル表示が崩れたための差し替え)。
const LINES: Array<{
  top: string;
  width: string;
  duration: string;
  delay: string;
  opacity: number;
  reverse?: boolean;
}> = [
  { top: "8%", width: "28%", duration: "26s", delay: "0s", opacity: 0.07 },
  { top: "16%", width: "45%", duration: "32s", delay: "4s", opacity: 0.05, reverse: true },
  { top: "24%", width: "18%", duration: "22s", delay: "9s", opacity: 0.09 },
  { top: "33%", width: "38%", duration: "29s", delay: "2s", opacity: 0.06, reverse: true },
  { top: "42%", width: "24%", duration: "24s", delay: "13s", opacity: 0.08 },
  { top: "51%", width: "50%", duration: "34s", delay: "6s", opacity: 0.05, reverse: true },
  { top: "60%", width: "20%", duration: "21s", delay: "11s", opacity: 0.08 },
  { top: "69%", width: "33%", duration: "27s", delay: "1s", opacity: 0.06, reverse: true },
  { top: "78%", width: "22%", duration: "23s", delay: "8s", opacity: 0.07 },
  { top: "87%", width: "40%", duration: "30s", delay: "15s", opacity: 0.05, reverse: true },
];

export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {LINES.map((line, index) => (
        <span
          key={index}
          className={`hero-line absolute h-px bg-ink ${line.reverse ? "hero-line-reverse" : ""}`}
          style={{
            top: line.top,
            width: line.width,
            animationDuration: line.duration,
            animationDelay: line.delay,
            ["--drift-opacity" as string]: line.opacity,
          }}
        />
      ))}
    </div>
  );
}
