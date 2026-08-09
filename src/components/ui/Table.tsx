import type { ReactNode } from "react";

// モバイルでの横崩れを防ぐため、テーブルは必ずこのラッパー経由で使う
export function Table({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}
