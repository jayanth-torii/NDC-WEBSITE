import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface GlobalBannerProps {
  title?: string;
  eyebrow?: string;
  subtitle?: string;
  image?: string;
  facts?: string[];
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  children?: React.ReactNode;
}

const GlobalBanner = ({
  title = '',
  eyebrow,
  subtitle,
  image,
  facts = [],
  breadcrumbs = [],
  className = '',
  children,
}: GlobalBannerProps) => {
  const titleParts = title.trim().split(' ');
  const titleLast = titleParts.length > 1 ? titleParts.pop() : null;

  // We only add the gradient overlay if there's an image.
  // Otherwise, use the standard fallback gradient from CSS/Tailwind.
  const photoStyle = image
    ? {
        backgroundColor: '#0e2455',
        backgroundImage: `radial-gradient(800px circle at 5% 5%, rgba(246, 135, 42, 0.04), transparent 40%), linear-gradient(105deg, #0e2455 0%, #0e2455 38%, rgba(14, 36, 85, 0.6) 55%, rgba(14, 36, 85, 0) 100%), url("${image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
      }
    : {
        background: 'radial-gradient(820px circle at 10% -10%, rgba(246, 135, 42, 0.08), transparent 42%), radial-gradient(820px circle at 92% 0%, rgba(50, 112, 252, 0.12), transparent 46%), linear-gradient(150deg, #0e2455 0%, #0a1a3f 100%)'
      };

  const paddingClass = (eyebrow || subtitle)
    ? 'pt-[100px] pb-[50px] lg:pt-[120px] lg:pb-[60px]'
    : 'pt-[80px] pb-[40px] lg:pt-[90px] lg:pb-[40px]';

  return (
    <section
      className={`relative overflow-hidden ${paddingClass} min-h-[160px] flex items-center ${className}`}
      style={photoStyle}
    >
      {/* Decorative dot pattern mask for non-photo banners */}
      {!image && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1.4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 22px)',
            backgroundSize: '22px 22px, auto',
            WebkitMaskImage: 'linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.35) 78%, transparent 100%)',
            maskImage: 'linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.35) 78%, transparent 100%)'
          }}
        />
      )}

      {/* Page-specific decorative shapes, layered above the photo/gradient */}
      {children && <div className="pointer-events-none absolute inset-0 z-[5]">{children}</div>}

      {/* Bottom orange gradient border */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[3px] z-10"
        style={{
          background: 'linear-gradient(90deg, #f6872a, rgba(246, 135, 42, 0) 65%)'
        }}
      />

      <div className="container relative z-20 mx-auto px-4 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-white/70" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="opacity-50">/</span>}
                {crumb.path ? (
                  <Link href={crumb.path} className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#ffb978] transition-colors duration-200">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {eyebrow && (
          <span className="mb-4 inline-flex items-center gap-[11px] text-[12.5px] font-bold uppercase tracking-[2.4px] text-[#f6872a]">
            <span className="h-[2px] w-[28px] rounded-full bg-[#f6872a]" />
            {eyebrow}
          </span>
        )}

        <h1 className="mb-5 text-[32px] font-extrabold leading-[1.07] tracking-tight text-white md:text-[40px] lg:text-[46px]">
          {titleParts.join(' ')} {titleLast && <span className="text-[#f6872a]">{titleLast}</span>}
        </h1>

        {subtitle && (
          <p className="mb-5 max-w-[700px] text-[16px] leading-[1.6] text-white/85">
            {subtitle}
          </p>
        )}

        {facts && facts.length > 0 && (
          <ul className="m-0 flex flex-wrap gap-2.5 p-0 list-none">
            {facts.map((f, idx) => (
              <li
                key={idx}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[14px] font-semibold text-white/90 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#f6872a]" />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default GlobalBanner;
