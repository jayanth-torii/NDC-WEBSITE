"use client";

import React from "react";

interface GlobalBannerProps {
  title: string;
  badge?: string;
  image?: string;
  className?: string;
}

const GlobalBanner: React.FC<GlobalBannerProps> = ({
  title,
  badge,
  image,
  className = "",
}) => {
  return (
    <div className={`w-full mx-auto md:mt-8 px-2 md:px-0 ${className}`}>
      <div 
        className="relative w-full overflow-hidden bg-[#0E2455] md:rounded-[48px] px-8 md:px-16 py-8 md:py-12 shadow-2xl flex flex-col justify-center min-h-[200px] md:min-h-[250px]"
        style={{
          backgroundImage: image 
            ? `linear-gradient(90deg, rgba(14,36,85,1) 0%, rgba(14,36,85,0.9) 35%, rgba(14,36,85,0.6) 55%, rgba(14,36,85,0.1) 100%), url("${image}")` 
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 max-w-4xl">
          {badge && (
            <div className="inline-block px-4 py-1.5 mb-4 border border-[#F09300]/40 rounded-full bg-[#F09300]/10 backdrop-blur-sm">
              <span className="text-[#F09300] text-xs md:text-sm font-bold tracking-widest uppercase">
                {badge}
              </span>
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default GlobalBanner;
