"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { motion, AnimatePresence } from "framer-motion";

const ResearchAwards = ({ data }: any) => {
  const researchData = data;
  const sections = researchData?.Sections || [];

  const [activeTab, setActiveTab] = useState(sections[0]?.TabName || "");
  const [visibleCount, setVisibleCount] = useState(6);

  if (!sections || sections.length === 0) return null;

  const activeSection = sections.find(
    (section: any) => section.TabName === activeTab
  );

  return (
    <Reveal as="section" className="relative bg-[#fcfcfd] border-b border-navy/5">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
              Recognition
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-navy tracking-[-0.03em] leading-tight">
              {researchData?.title || "Research & Awards"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 bg-white p-1.5 rounded-full shadow-sm border border-gray-100 shrink-0">
            {sections.map((section: any) => (
              <button
                key={section.TabName}
                type="button"
                onClick={() => {
                  setActiveTab(section.TabName);
                  setVisibleCount(6); // Reset on tab switch
                }}
                className={`relative px-5 py-2.5 text-[14px] md:text-[15px] font-bold transition-all duration-300 rounded-full ${
                  activeTab === section.TabName
                    ? "bg-navy text-white shadow-md"
                    : "text-gray-500 hover:text-navy hover:bg-gray-50"
                }`}
              >
                {section.TabName}
              </button>
            ))}
          </div>
        </header>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04 } // Speed up wave stagger
                },
                exit: {
                  opacity: 0,
                  transition: { staggerChildren: 0.02, staggerDirection: -1 } 
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeSection?.ListPoints?.length > 0 ? (
                <>
                  {activeSection.ListPoints.slice(0, visibleCount).map((item: string, idx: number) => (
                    <motion.div
                      key={`${activeTab}-${idx}`}
                      variants={{
                        hidden: { opacity: 0, y: 30, rotateX: -15 },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          rotateX: 0, 
                          transition: { type: "spring", stiffness: 100, damping: 12 } 
                        },
                        exit: { 
                          opacity: 0, 
                          y: -15, 
                          rotateX: 15, 
                          transition: { duration: 0.2 } 
                        }
                      }}
                      style={{ perspective: 1000 }}
                      whileHover={{ scale: 1.03, y: -5, transition: { type: "spring", stiffness: 400 } }}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 group flex flex-col gap-5"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center shrink-0 group-hover:bg-orange transition-colors duration-300">
                        <span className="text-orange font-black text-lg tabular-nums group-hover:text-white transition-colors duration-300">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-[14px] md:text-[15px] font-medium text-[#5f6368] leading-relaxed group-hover:text-navy transition-colors duration-300">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                  
                  {activeSection.ListPoints.length > 6 && (
                    <motion.div 
                      layout
                      className="col-span-full flex justify-center pt-8"
                    >
                      <button
                        onClick={() => {
                          if (visibleCount >= activeSection.ListPoints.length) {
                            setVisibleCount(6);
                          } else {
                            setVisibleCount(prev => prev + 6);
                          }
                        }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-orange text-orange text-sm font-bold hover:bg-orange hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        {visibleCount >= activeSection.ListPoints.length ? "Show Less" : "Load More"}
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={`transition-transform duration-300 ${visibleCount >= activeSection.ListPoints.length ? 'rotate-180' : ''}`}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="col-span-full text-[#5f6368] italic text-center py-12">
                  No points available for {activeTab}.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
};

export default ResearchAwards;
