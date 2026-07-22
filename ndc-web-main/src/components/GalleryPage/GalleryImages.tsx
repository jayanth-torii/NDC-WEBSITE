"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PHOTOS_PER_ROW = 4;
const INITIAL_ROWS = 4;
const INITIAL_VISIBLE = PHOTOS_PER_ROW * INITIAL_ROWS; // 16

const ExpandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
    <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
    <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
    <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
  </svg>
);

const GalleryImages = ({ imageData = {} }: { imageData: Record<string, string[]> }) => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [popupIndex, setPopupIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Tabs computation
  const categories = Object.keys(imageData).filter((k) => k !== "ALL");
  const tabs = ["ALL", ...categories];
  const allImages = categories.flatMap((k) => imageData[k] || []);

  const displayedImages = activeTab === "ALL" ? allImages : (imageData[activeTab] || []);
  const visibleImages = displayedImages.slice(0, visibleCount);
  
  const canLoadMore = visibleCount < displayedImages.length;
  const canLoadLess = visibleCount > INITIAL_VISIBLE;

  const countFor = (tab: string) => {
    if (tab === "ALL") return allImages.length;
    return (imageData[tab] || []).length;
  };

  const selectTab = (tab: string) => {
    setPopupIndex(null);
    setActiveTab(tab);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + INITIAL_VISIBLE, displayedImages.length));
  };

  const loadLess = () => {
    const nextCount = Math.max(INITIAL_VISIBLE, visibleCount - INITIAL_VISIBLE);
    setVisibleCount(nextCount);
    if (popupIndex !== null && popupIndex >= nextCount) {
      setPopupIndex(null);
    }
  };

  const closePopup = useCallback(() => setPopupIndex(null), []);
  const prevImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPopupIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : visibleImages.length - 1));
  }, [visibleImages.length]);
  
  const nextImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPopupIndex((prev) => (prev !== null && prev < visibleImages.length - 1 ? prev + 1 : 0));
  }, [visibleImages.length]);

  useEffect(() => {
    if (popupIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [popupIndex, closePopup, prevImage, nextImage]);

  return (
    <div className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Filter tabs */}
        <div className="relative flex items-center w-full border-b border-gray-200 mb-10 pb-4">
          <button
            className="absolute left-0 z-10 p-2 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-full text-[#0e2455] hover:text-[#f6872a] transition-colors"
            onClick={() => {
              if (tabsRef.current) tabsRef.current.scrollBy({ left: -250, behavior: "smooth" });
            }}
          >
            <FaChevronLeft size={16} />
          </button>

          <div
            ref={tabsRef}
            className="flex items-center gap-3 overflow-x-auto px-10 whitespace-nowrap scroll-smooth w-full scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => selectTab(tab)}
                  className={`relative shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-600 hover:text-[#f6872a] bg-gray-50 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="galleryTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-[#f6872a] to-[#ff6b00] rounded-full shadow-md z-0"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {countFor(tab)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            className="absolute right-0 z-10 p-2 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-full text-[#0e2455] hover:text-[#f6872a] transition-colors"
            onClick={() => {
              if (tabsRef.current) tabsRef.current.scrollBy({ left: 250, behavior: "smooth" });
            }}
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        {/* Image Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {visibleImages.map((src, index) => (
              <motion.button
                type="button"
                key={`${activeTab}-${index}`}
                className="group relative w-full aspect-square overflow-hidden rounded-[16px] bg-gray-100 shadow-sm"
                onClick={() => setPopupIndex(index)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: (index % INITIAL_VISIBLE) * 0.03 }}
              >
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-[#0a1a3f]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ExpandIcon />
                  </span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Actions */}
        {(canLoadMore || canLoadLess) && (
          <div className="mt-16 flex justify-center gap-4">
            {canLoadLess && (
              <button
                type="button"
                className="px-8 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-sm transition-colors hover:border-[#0e2455] hover:text-[#0e2455]"
                onClick={loadLess}
              >
                Load Less
              </button>
            )}
            {canLoadMore && (
              <button
                type="button"
                className="px-8 py-3 rounded-full bg-[#f6872a] text-white font-bold uppercase tracking-wider text-sm transition-transform hover:-translate-y-1 shadow-lg shadow-orange-500/30"
                onClick={loadMore}
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {popupIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closePopup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
              onClick={closePopup}
              aria-label="Close"
            >
              <FaTimes size={24} />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 lg:left-10 z-50 p-3 lg:p-4 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <FaChevronLeft size={24} />
            </button>

            {/* Image Container */}
            <motion.div
              className="relative w-full max-w-6xl max-h-[85vh] px-16 lg:px-24 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              key={popupIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <img
                src={visibleImages[popupIndex]}
                alt="Gallery full view"
                className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
              />
            </motion.div>

            {/* Next Button */}
            <button
              className="absolute right-4 lg:right-10 z-50 p-3 lg:p-4 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
              onClick={nextImage}
              aria-label="Next image"
            >
              <FaChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 font-medium tracking-wide text-sm">
              {popupIndex + 1} / {visibleImages.length} <span className="mx-2 opacity-50">&bull;</span> {activeTab}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryImages;
