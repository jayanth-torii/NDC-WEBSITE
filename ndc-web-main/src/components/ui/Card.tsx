import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: "none" | "orange-left";
}

export default function Card({ children, className = "", accent = "none" }: CardProps) {
  return (
    <div
      className={`group rounded-[18px] border border-card-border bg-white shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-card-border-hover ${
        accent === "orange-left" ? "border-l-4 border-l-orange" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
