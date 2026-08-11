"use client";

import { useEffect, useRef } from "react";

// トップページのヒーロー背景。「墨のにじみ」(ink-blob)と、実際の検証済み最高還元率が
// 0からゆっくりカウントアップする巨大な数字(giant-stat)を組み合わせる。
// プレビューで比較した3案(ハイライト/墨のにじみ/巨大数字)のうち、
// 墨のにじみ+巨大数字の組み合わせを採用した(2026-08-09)。
export function HeroBackground({ targetRate }: { targetRate?: number }) {
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statRef.current;
    if (!el || !targetRate) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.textContent = `${targetRate.toFixed(1)}%`;
      return;
    }

    const DURATION = 3200;
    const HOLD = 2600;
    const PAUSE = 1600;
    let start: number | null = null;
    let frameId: number;

    function frame(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      if (!el || !targetRate) return;
      if (elapsed <= DURATION) {
        const t = elapsed / DURATION;
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${(eased * targetRate).toFixed(1)}%`;
      } else if (elapsed <= DURATION + HOLD) {
        el.textContent = `${targetRate.toFixed(1)}%`;
      } else if (elapsed <= DURATION + HOLD + PAUSE) {
        el.textContent = "0.0%";
      } else {
        start = ts;
      }
      frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(frameId);
  }, [targetRate]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* 背景要素は画面幅いっぱいではなく、max-w-6xlの範囲内に収めて配置する。
          セクション自体はフルブリードのままだが、超ワイドな画面で右端に偏りすぎないようにするため */}
      <div className="relative mx-auto h-full max-w-6xl">
        <div className="hero-ink-blob hero-ink-blob-1" />
        <div className="hero-ink-blob hero-ink-blob-2" />
        {targetRate ? (
          <div ref={statRef} className="hero-giant-stat">
            0.0%
          </div>
        ) : null}
      </div>
    </div>
  );
}
