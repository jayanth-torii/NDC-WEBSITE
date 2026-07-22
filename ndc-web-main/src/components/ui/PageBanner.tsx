import React from "react";
import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageBannerProps {
  eyebrow?: string;
  title: string;
  highlightLastWord?: boolean;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  image?: string;
  facts?: string[];
  tall?: boolean;
  className?: string;
}

const gradientOnly =
  "radial-gradient(820px circle at 10% -10%, rgba(246,135,42,.12), transparent 42%), " +
  "radial-gradient(820px circle at 92% 0%, rgba(50,112,252,.16), transparent 46%), " +
  "linear-gradient(150deg, #0e2455 0%, #0a1a3f 100%)";

function withPhoto(image: string) {
  return (
    "linear-gradient(90deg, rgba(10,26,63,0.86) 0%, rgba(10,26,63,0.58) 38%, rgba(10,26,63,0.22) 55%, rgba(10,26,63,0) 72%), " +
    `url(${image})`
  );
}

export default function PageBanner({
  eyebrow,
  title,
  highlightLastWord = true,
  subtitle,
  breadcrumbs,
  image,
  facts,
  tall = false,
  className = "",
}: PageBannerProps) {
  const words = title.trim().split(/\s+/);
  const lastWord = words.pop();
  const leadWords = words.join(" ");

  return (
    <div
      className={`relative overflow-hidden ${tall ? "min-h-[480px] flex items-center" : ""} py-[90px] sm:py-[120px] pb-[50px] sm:pb-[20px] ${className}`}
      style={{
        background: image ? withPhoto(image) : gradientOnly,
        backgroundSize: image ? "cover" : undefined,
        backgroundPosition: image ? "right center" : undefined,
      }}
    >
      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-orange to-transparent" />

      <div className="relative mx-auto w-[90%] max-w-[1280px]">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-white/70">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {eyebrow && (
          <div className="mb-3 flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[2.4px] text-orange">
            <span className="inline-block h-[2px] w-7 bg-orange" />
            {eyebrow}
          </div>
        )}

        <h1
          className={`font-extrabold text-white ${
            tall ? "text-[34px] sm:text-[54px]" : "text-[32px] sm:text-[40px] md:text-[46px]"
          } leading-[1.07] tracking-[-1px]`}
        >
          {leadWords ? `${leadWords} ` : ""}
          {highlightLastWord ? <span className="text-orange">{lastWord}</span> : lastWord}
        </h1>

        {subtitle && (
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/86">{subtitle}</p>
        )}

        {facts && facts.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {facts.map((fact) => (
              <span
                key={fact}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                {fact}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
