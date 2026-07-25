"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

const ImageCarousel = ({ images, title }: { images: string[], title?: string }) => {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    if (!safeImages.length) return;
    setIndex((i) => (i + 1) % safeImages.length);
  }, [safeImages.length]);

  const prev = useCallback(() => {
    if (!safeImages.length) return;
    setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  }, [safeImages.length]);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [next, safeImages.length]);

  if (safeImages.length === 0) return null;

  const isSpecialEvent = title && title.toLowerCase().includes("faculty development program");

  return (
    <div className="relative w-full overflow-hidden mb-2 group/carousel bg-transparent rounded-xl">
      <div className={`w-full overflow-hidden ${isSpecialEvent ? 'aspect-[4/3] md:aspect-[3/2] flex items-center justify-center' : 'aspect-video'}`}>
        <img
          src={safeImages[index]}
          alt={`Slide ${index + 1}`}
          className={`w-full h-full transition-transform duration-[1000ms] ease-out group-hover/carousel:scale-105 ${isSpecialEvent ? 'object-contain' : 'object-cover'}`}
        />
      </div>

      {safeImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 bg-white/95 shadow-sm border border-navy/10 p-2 text-navy hover:bg-orange hover:text-white hover:border-orange transition-all duration-300 rounded-full opacity-0 group-hover/carousel:opacity-100"
            aria-label="Previous"
            type="button"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 bg-white/95 shadow-sm border border-navy/10 p-2 text-navy hover:bg-orange hover:text-white hover:border-orange transition-all duration-300 rounded-full opacity-0 group-hover/carousel:opacity-100"
            aria-label="Next"
            type="button"
          >
            <ChevronRight size={18} />
          </button>
          
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 px-2.5 py-1.5 rounded-full backdrop-blur-sm">
            {safeImages.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-white w-3' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const Activities = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, any> =
    (departmentJson["activities"] as any)?.data || {};

  const normalizedMap = useMemo(() => {
    const map: Record<string, any> = {};
    Object.keys(apiData || {}).forEach((k) => {
      map[normalizeKey(k)] = apiData[k];
    });
    return map;
  }, [apiData]);

  const content = useMemo(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!content)
    return (
      <p className="text-center text-body-gray">
        {" "}
        No activities found for <strong>{programme}</strong>.
      </p>
    );

  const title = content?.title || "Activities";
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return (
    <Reveal>
      <div className="space-y-10">
        <header className="pb-4 border-b border-navy/10">
          <p className="text-orange text-[10px] font-bold tracking-[0.28em] uppercase mb-2">
            Campus life
          </p>
          <h1 className="text-2xl md:text-3xl text-navy font-extrabold tracking-tight">
            {title}
          </h1>
        </header>

        <div className="flex flex-col gap-10 lg:gap-14">
          {sections.map((section: any, idx: number) => {
            const isEven = idx % 2 === 0;
            const hasImages = Array.isArray(section?.images) && section.images.length > 0;
            
            return (
              <div
                key={idx}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 lg:gap-12 items-center group`}
              >
                {/* Image Side */}
                {hasImages && (
                  <div className="w-full lg:w-5/12 shrink-0">
                    <ImageCarousel images={section.images} title={section.title} />
                  </div>
                )}
                
                {/* Content Side */}
                <div className={`w-full ${hasImages ? 'lg:w-7/12' : 'w-full'} flex flex-col justify-center`}>
                  <div className="mb-3">
                    <h3 className="font-bold text-lg md:text-xl text-navy tracking-tight leading-snug">
                      {section.title}
                    </h3>
                  </div>

                  {section?.description && (
                    <p className="leading-relaxed text-[13.5px] md:text-sm font-medium text-[#5f6368] whitespace-pre-line mt-1.5">
                      {section.description}
                    </p>
                  )}
                  
                  <div className="mt-6 flex items-center gap-5">
                    <button className="group/btn inline-flex items-center gap-1.5 text-[13px] font-bold text-navy hover:text-orange transition-colors duration-300 uppercase tracking-wider relative">
                      <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">Read More</span>
                      <svg className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
};

export default Activities;
