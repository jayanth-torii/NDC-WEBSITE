import React from "react";
import Kicker from "./Kicker";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow && <Kicker>{eyebrow}</Kicker>}
      <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-extrabold leading-[1.15] tracking-[-0.5px] text-navy">
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-[17px] leading-[1.65] text-body-gray ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
