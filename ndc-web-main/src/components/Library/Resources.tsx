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
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeLetter, setActiveLetter] = useState("All");
  const [isShowingLess, setIsShowingLess] = useState(false);

  useEffect(() => {
    setVisibleCount(6);
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
      setVisibleCount((prev) => prev + 6);
    } else {
      setIsShowingLess(true);
      setVisibleCount(6);
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
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Left List: Resources */}
        <div className="w-full lg:w-2/3">
          <motion.div layout className="flex flex-col divide-y divide-card-border border-t border-card-border">
            <AnimatePresence initial={false}>
              {visibleResources.map((row: any, index: number) => (
                <motion.div
                  key={`${activeTab}-${row.sn || index}`}
                  layout
                  initial={{ opacity: 0, height: 0, padding: 0 }}
                  animate={{ opacity: 1, height: "auto", padding: "1.25rem 0.5rem" }}
                  exit={{ opacity: 0, height: 0, padding: 0, overflow: "hidden" }}
                  transition={{ duration: isShowingLess ? 0.8 : 0.3, ease: "easeInOut" }}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between hover:bg-surface-tint/60 transition-colors duration-250 ease-[var(--ease-editorial)] rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-chip-bg text-orange flex items-center justify-center text-base font-bold group-hover:bg-navy group-hover:text-white transition-colors duration-250">
                      {row?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-[15px] font-bold text-navy">
                        {row?.name}
                      </h3>
                    </div>
                  </div>

                  <a
                    href={row?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 sm:mt-0 flex items-center gap-1.5 text-sm font-bold text-gray-400 group-hover:text-orange transition-colors ml-[60px] sm:ml-0"
                  >
                    Visit Resource <ArrowRight size={16} />
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {totalItems > 6 && (
            <motion.div layout className="flex justify-center mt-8">
              <Button onClick={handleToggleShow} variant="primary">
                {visibleCount < totalItems ? "Load More Resources" : "Show Less"}
              </Button>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar: A-Z Index */}
        <div className="hidden lg:flex w-1/3 flex-col bg-surface-tint rounded-[20px] p-6 border border-card-border sticky top-24">
          <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-4">Browse A-Z</h3>
          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[400px] pr-2 no-scrollbar">
            <button
              onClick={() => { setActiveLetter("All"); setVisibleCount(6); }}
              className={`w-full py-1.5 rounded-full text-sm font-bold text-center transition-colors duration-250 ${
                activeLetter === "All" ? "bg-navy text-white" : "bg-white text-body-gray hover:text-navy border border-card-border"
              }`}
            >
              All
            </button>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <button
                key={letter}
                onClick={() => { setActiveLetter(letter); setVisibleCount(6); }}
                className={`w-full py-1.5 rounded-full text-sm font-bold text-center transition-colors duration-250 ${
                  activeLetter === letter ? "bg-navy text-white" : "bg-white text-body-gray hover:text-navy border border-card-border"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resources;
