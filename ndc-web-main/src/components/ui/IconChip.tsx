import React from "react";

interface IconChipProps {
  children: React.ReactNode;
  size?: number;
  className?: string;
}

export default function IconChip({ children, size = 52, className = "" }: IconChipProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-[14px] bg-chip-bg text-orange shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}
