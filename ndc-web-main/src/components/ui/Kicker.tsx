import React from "react";

interface KickerProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export default function Kicker({ children, className = "", light = false }: KickerProps) {
  return (
    <div
      className={`flex items-center gap-2 text-[13px] font-bold uppercase tracking-[2px] text-orange ${className}`}
    >
      <span className="inline-block h-[2px] w-7 bg-orange" />
      <span className={light ? "text-orange" : ""}>{children}</span>
    </div>
  );
}
