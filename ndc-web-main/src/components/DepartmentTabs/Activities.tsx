"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

// -------- Image Carousel (small, 4:3, auto-scroll, 1 mobile / 3 desktop) --------
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

  // Auto-advance every 2.5s
  useEffect(() => {
    if (safeImages.length <= 1) return;
    const t = setInterval(next, 2500);
    return () => clearInterval(t);
  }, [next, safeImages.length]);

  if (safeImages.length === 0) return null;

// Show up to VISIBLE_DESKTOP images without repeating
const desktopWindow = Array.from({ length: Math.min(VISIBLE_DESKTOP, safeImages.length) }, (_, i) => {
  const pos = (index + i) % safeImages.length;
  return safeImages[pos];
});

  return (
    <div className="relative w-full   mx-auto overflow-hidden mb-4">
      {/* Mobile: single image */}
      <div className="sm:hidden w-full">
        <div className="w-full aspect-[4/3]">
          <img
            src={safeImages[index]}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover rounded-[14px] shadow-[var(--shadow-card)]"
          />
        </div>
      </div>

      {/* Desktop: 3 images */}
      <div className="hidden sm:flex gap-3 items-center justify-center">
        {desktopWindow.map((src, i) => (
          <div key={`${index}-${i}`} className="w-1/3">
            <div className="w-full aspect-[4/3]">
              <img
                src={src}
                alt={`Slide ${((index + i) % safeImages.length) + 1}`}
                className="w-full h-full object-cover rounded-[14px] shadow-[var(--shadow-card)]"
              />
            </div>
          </div>
        ))}
      </div>

      {safeImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-x-0.5"
            aria-label="Previous"
            type="button"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-navy" />
          </button>
          <button
            onClick={next}
            className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 bg-white px-2 py-1 rounded-full shadow-[var(--shadow-card)] transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:translate-x-0.5"
            aria-label="Next"
            type="button"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-navy" />
          </button>
        </>
      )}
    </div>
  );
};

// ---------------- Activities ----------------
const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const Activities = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, any> = (departmentJson["activities"] as any)?.data || {};
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Normalize keys
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

  // Inform parent whether the programme key exists
  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  // ---- UI returns AFTER all hooks ----
  if (!content) return <p className="text-center text-body-gray"> No activities found for <strong>{programme}</strong>.</p>;

  const title = content?.title || "Activities";
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return (
    <Reveal>
      <div className="w-full mb-20">
        <h1 className="text-2xl md:text-3xl text-navy font-extrabold mb-6 tracking-[-0.5px]">{title}</h1>

        {sections.map((section: any, idx: number) => (
          <div key={idx} className="border border-card-border rounded-[14px] overflow-hidden mb-3 transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-4 text-left bg-surface-tint cursor-pointer text-navy text-lg md:text-xl font-semibold flex justify-between items-center"
            >
              {section.title}
              <FontAwesomeIcon
                icon={openIndex === idx ? faChevronUp : faChevronDown}
                className="text-orange"
              />
            </button>

            {openIndex === idx && (
              <div className="p-4 bg-white space-y-4">
                {section?.description && (
                  <p className="text-body-gray text-justify whitespace-pre-line leading-relaxed">{section.description}</p>
                )}
                {Array.isArray(section?.images) && section.images.length > 0 && (
                  <ImageCarousel images={section.images} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Reveal>
  );
};

export default Activities;
