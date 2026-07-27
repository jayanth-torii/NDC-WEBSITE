"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, MonitorPlay, FileText, Library, FileSearch, SpellCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

type ResourceRow = {
  sn: number;
  name: string;
  link: string;
};

type DigitalResources = {
  title: string;
  tabs: string[];
  resoursesTable: Record<string, ResourceRow[]>;
};

const getIconForTab = (tabName: string) => {
  const name = tabName.toLowerCase();
  if (name.includes("dictionar")) return <SpellCheck size={18} />;
  if (name.includes("book")) return <BookOpen size={18} />;
  if (name.includes("video")) return <MonitorPlay size={18} />;
  if (name.includes("thesis") || name.includes("dissertation")) return <FileText size={18} />;
  if (name.includes("journal")) return <FileSearch size={18} />;
  return <Library size={18} />;
};

const Resources = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, resoursesTable }: DigitalResources = data;
  const tabs = Object.keys(resoursesTable || {});
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeLetter, setActiveLetter] = useState("All");
  const [isShowingLess, setIsShowingLess] = useState(false);

  useEffect(() => {
    setVisibleCount(8);
    setActiveLetter("All");
    setIsShowingLess(false);
  }, [activeTab]);

  const allTabResources = resoursesTable[activeTab] || [];
  const currentResources = activeLetter === "All"
    ? allTabResources
    : allTabResources.filter(row => row?.name?.toUpperCase().startsWith(activeLetter));

  const visibleResources = currentResources.slice(0, visibleCount);
  const totalItems = currentResources.length;

  const handleToggleShow = () => {
    if (visibleCount < totalItems) {
      setIsShowingLess(false);
      setVisibleCount((prev) => prev + 8);
    } else {
      setIsShowingLess(true);
      setVisibleCount(8);
    }
  };

  return (
    <div className="mb-16">
      <SectionHeading
        eyebrow="Resources"
        title={title}
        subtitle="Access a wide collection of trusted digital resources to support your learning, research, and academic excellence."
        className="mb-10"
      />

      {/* Tabs */}
      <div className="inline-flex flex-wrap gap-1.5 bg-surface-tint p-1.5 rounded-2xl mb-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-250 ease-[var(--ease-editorial)] ${
                isActive ? "bg-navy text-white shadow-sm" : "text-body-gray hover:text-navy"
              }`}
            >
              {getIconForTab(tab)}
              {tab}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col">
        
        {/* A-Z Alphabet Ruler */}
        <div className="relative w-full max-w-full mb-10 overflow-hidden">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-4 border-b border-gray-100">
            <button
              onClick={() => { setActiveLetter("All"); setVisibleCount(6); }}
              className={`shrink-0 px-6 py-2.5 rounded-full text-[13px] tracking-wider font-black uppercase transition-all duration-300 ${
                activeLetter === "All" 
                  ? "bg-navy text-white shadow-md" 
                  : "bg-white text-gray-400 hover:text-navy hover:bg-gray-50 border border-gray-100"
              }`}
            >
              ALL
            </button>
            
            <div className="shrink-0 w-px h-6 bg-gray-200 mx-2 md:mx-4" />

            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <button
                key={letter}
                onClick={() => { setActiveLetter(letter); setVisibleCount(6); }}
                className={`shrink-0 w-11 h-11 flex items-center justify-center rounded-full text-[15px] font-black transition-all duration-300 ${
                  activeLetter === letter 
                    ? "bg-orange text-white shadow-[0_4px_16px_rgba(246,135,42,0.4)] scale-110" 
                    : "bg-white text-gray-400 hover:text-navy border border-gray-100 hover:border-navy hover:scale-110"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
          {/* Subtle fade effect on the right edge to indicate horizontal scroll */}
          <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden" />
        </div>

        {/* Resources Grid */}
        <div className="w-full min-h-[300px]">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            <AnimatePresence mode="wait">
              {visibleResources.map((row: any, index: number) => (
                <motion.div
                  key={`${activeTab}-${row.sn || index}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex flex-col justify-between bg-white border border-gray-100 p-4 sm:p-5 rounded-[18px] hover:border-orange/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-400"
                >
                  <div className="flex items-start gap-3.5 mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-[#f8f9fa] border border-gray-100 text-navy flex items-center justify-center text-lg font-black group-hover:bg-orange group-hover:text-white group-hover:border-orange transition-all duration-400 shadow-sm">
                      {row?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-[13px] sm:text-[14px] font-extrabold text-navy leading-snug group-hover:text-orange transition-colors duration-300 line-clamp-3">
                        {row?.name}
                      </h3>
                    </div>
                  </div>

                  <a
                    href={row?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full pt-3 border-t border-gray-50 text-[11px] sm:text-[12px] uppercase tracking-wider font-bold text-gray-400 group-hover:text-orange transition-colors duration-300"
                  >
                    <span>View</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange/10 group-hover:translate-x-1.5 transition-all duration-300">
                      <ArrowRight size={13} />
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {totalItems > 8 && (
            <motion.div layout className="flex justify-center mt-12">
              <Button onClick={handleToggleShow} variant="primary">
                {visibleCount < totalItems ? "Load More Resources" : "Show Less"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
