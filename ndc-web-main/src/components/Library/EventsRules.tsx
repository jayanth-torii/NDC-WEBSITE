"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsRules({ data }: { data: any }) {
  if (!data) return null;
  const { title, events, rulesRegulations } = data;

  const [visibleCount, setVisibleCount] = useState(6);
  const [isShowingLess, setIsShowingLess] = useState(false);

  const rules = rulesRegulations?.sections || [];
  const totalRules = rules.length;
  const visibleRules = rules.slice(0, visibleCount);

  const handleToggleShow = () => {
    if (visibleCount < totalRules) {
      setIsShowingLess(false);
      setVisibleCount((prev) => prev + 6);
    } else {
      setIsShowingLess(true);
      setVisibleCount(6);
    }
  };

  return (
    <div className="w-[90%] mx-auto mb-16 relative">
      
      {/* Dynamic Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0E2455] opacity-[0.03] rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Hero-Style Events Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 border-l-[4px] border-[#0E2455] pl-6 md:pl-10"
      >
        <h1 className="text-2xl font-bold mb-4 text-[#003333] uppercase tracking-wide">
          {title}
        </h1>
        <div className="space-y-4 max-w-4xl">
          {events?.map((paragraph: string, index: number) => (
            <p key={index} className="text-base text-[#003333] leading-relaxed font-medium">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Grid-Based Rules Architecture */}
      <div className="pt-8 border-t border-gray-200 relative">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          
          {/* Sticky Header Column */}
          <div className="w-full md:w-1/4">
            <div className="md:sticky md:top-24">
              <h2 className="text-[#003333] font-bold text-2xl mb-2">
                {rulesRegulations?.title}
              </h2>
              <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
              <p className="mt-4 text-base text-gray-500">
                Please adhere to the following guidelines to ensure a productive environment for everyone.
              </p>
            </div>
          </div>

          {/* Masonry / Staggered Cards Column */}
          <div className="w-full md:w-3/4">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <AnimatePresence initial={false}>
                {visibleRules.map((rule: string, index: number) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, height: 0, padding: 0 }}
                    animate={{ opacity: 1, height: "auto", padding: "1.5rem" }}
                    exit={{ opacity: 0, height: 0, padding: 0, overflow: "hidden" }}
                    transition={{ duration: isShowingLess ? 0.8 : 0.3, ease: "easeInOut" }}
                    className="bg-[#F6F6F6] rounded-2xl shadow-sm border border-transparent hover:border-gray-200 hover:shadow-md hover:bg-white transition-colors duration-300 group flex flex-col justify-between overflow-hidden"
                  >
                    <div className="text-4xl font-black text-gray-200 mb-4 group-hover:text-orange-500/20 transition-colors">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                    <p className="text-base text-[#003333] font-medium leading-snug">
                      {rule}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Pagination */}
            {totalRules > 6 && (
              <motion.div layout className="flex justify-center mt-10">
                <button
                  onClick={handleToggleShow}
                  className="px-8 py-2.5 rounded-full bg-[#0E2455] text-white font-bold text-base hover:bg-orange-500 transition-colors shadow-md"
                >
                  {visibleCount < totalRules ? "Load More Rules" : "Show Less"}
                </button>
              </motion.div>
            )}
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
