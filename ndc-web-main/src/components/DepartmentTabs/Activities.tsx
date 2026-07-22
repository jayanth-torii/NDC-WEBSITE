"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "@/config/apiService";

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
            className="w-full h-full object-cover rounded-md shadow"
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
                className="w-full h-full object-cover rounded-md shadow"
              />
            </div>
          </div>
        ))}
      </div>

      {safeImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 bg-white px-2 rounded-full shadow"
            aria-label="Previous"
            type="button"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-[#0E2455]" />
          </button>
          <button
            onClick={next}
            className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 bg-white px-2 rounded-full shadow"
            aria-label="Next"
            type="button"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-[#0E2455]" />
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

  const [apiData, setApiData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/activities`)
      .then((res) => setApiData(res?.data?.data || {}))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

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
  if (loading) return <div className="text-center py-20 text-gray-500">Loading Activities...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load Activities.</div>;

  if (!content) return <p className="text-center text-gray-500"> No activities found for <strong>{programme}</strong>.</p>;

  const title = content?.title || "Activities";
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return (
    <div className="w-full mb-20">
      <h1 className="text-2xl md:text-3xl text-[#003333] font-bold mb-6">{title}</h1>

      {sections.map((section: any, idx: number) => (
        <div key={idx} className="border border-gray-300 rounded-lg overflow-hidden mb-3">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full p-4 text-left bg-gray-100 cursor-pointer text-[#0E2455] text-lg md:text-xl font-semibold flex justify-between items-center"
          >
            {section.title}
            <FontAwesomeIcon
              icon={openIndex === idx ? faChevronUp : faChevronDown}
              className="text-[#0E2455]"
            />
          </button>

          {openIndex === idx && (
            <div className="p-4 bg-white space-y-4">
              {section?.description && (
                <p className="text-[#0E2455] text-justify whitespace-pre-line">{section.description}</p>
              )}
              {Array.isArray(section?.images) && section.images.length > 0 && (
                <ImageCarousel images={section.images} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Activities;
