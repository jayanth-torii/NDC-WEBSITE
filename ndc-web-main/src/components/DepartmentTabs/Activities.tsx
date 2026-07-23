"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const [index, setIndex] = useState(0);
  const VISIBLE_DESKTOP = 3;

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
    const t = setInterval(next, 2500);
    return () => clearInterval(t);
  }, [next, safeImages.length]);

  if (safeImages.length === 0) return null;

  const desktopWindow = Array.from(
    { length: Math.min(VISIBLE_DESKTOP, safeImages.length) },
    (_, i) => {
      const pos = (index + i) % safeImages.length;
      return safeImages[pos];
    }
  );

  return (
    <div className="relative w-full overflow-hidden mb-2">
      <div className="sm:hidden w-full">
        <div className="w-full aspect-[4/3] overflow-hidden border border-navy/10">
          <img
            src={safeImages[index]}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="hidden sm:flex gap-3 items-center justify-center">
        {desktopWindow.map((src, i) => (
          <div key={`${index}-${i}`} className="w-1/3">
            <div className="w-full aspect-[4/3] overflow-hidden border border-navy/10">
              <img
                src={src}
                alt={`Slide ${((index + i) % safeImages.length) + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {safeImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 bg-white/95 border border-navy/15 p-2 text-navy hover:bg-orange hover:text-white hover:border-orange transition-all duration-300"
            aria-label="Previous"
            type="button"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 bg-white/95 border border-navy/15 p-2 text-navy hover:bg-orange hover:text-white hover:border-orange transition-all duration-300"
            aria-label="Next"
            type="button"
          >
            <ChevronRight size={18} />
          </button>
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      <div className="w-full">
        <header className="pb-6 mb-2 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Campus life
          </p>
          <h1 className="text-3xl md:text-4xl text-navy font-extrabold tracking-tight">
            {title}
          </h1>
        </header>

        {sections.map((section: any, idx: number) => {
          const open = openIndex === idx;
          return (
            <div key={idx} className="border-b border-navy/15 first:border-t">
              <button
                onClick={() => setOpenIndex(open ? null : idx)}
                className="w-full py-5 text-left cursor-pointer text-navy flex justify-between items-center gap-4 group"
                type="button"
                aria-expanded={open}
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                      open ? "text-orange" : "group-hover:text-orange"
                    }`}
                  >
                    {section.title}
                  </span>
                </span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-navy/40 transition-transform duration-400 ease-[var(--ease-editorial)] ${
                    open ? "rotate-180 text-orange" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-500 ease-[var(--ease-editorial)] ${
                  open
                    ? "grid-rows-[1fr] opacity-100 pb-8"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-4 pl-0 sm:pl-10">
                  {section?.description && (
                    <p className="text-body-gray whitespace-pre-line leading-relaxed max-w-prose">
                      {section.description}
                    </p>
                  )}
                  {Array.isArray(section?.images) &&
                    section.images.length > 0 && (
                      <ImageCarousel images={section.images} />
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
};

export default Activities;
