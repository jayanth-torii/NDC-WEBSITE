"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, MonitorPlay, FileText, Library, FileSearch } from "lucide-react";

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
  if (name.includes("book")) return <BookOpen className="w-5 h-5" />;
  if (name.includes("video")) return <MonitorPlay className="w-5 h-5" />;
  if (name.includes("thesis") || name.includes("dissertation")) return <FileText className="w-5 h-5" />;
  if (name.includes("journal")) return <FileSearch className="w-5 h-5" />;
  return <Library className="w-5 h-5" />;
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
    <div className="w-[90%] mx-auto mb-16 text-[#003333]">
      {/* Title Area */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-2xl font-extrabold text-[#0E2455] uppercase tracking-wide mb-2">
          {title}
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Access a wide collection of trusted digital resources to support your learning, research, and academic excellence.
        </p>
      </div>

      {/* Elegant Tabs */}
      <div className="flex flex-wrap items-center justify-start gap-2 md:gap-8 border-b-2 border-gray-100 mb-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 pb-3 px-2 text-base font-bold transition-all relative ${
                isActive ? "text-[#0E2455]" : "text-gray-400 hover:text-[#003333]"
              }`}
            >
              <span className={isActive ? "text-orange-500" : ""}>{getIconForTab(tab)}</span>
              <span>{tab.toUpperCase()}</span>
              {isActive && (
                <motion.div
                  layoutId="bottomTabLine"
                  className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-[#0E2455] rounded-t-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Left List: Resources */}
        <div className="w-full lg:w-3/4">
          <h2 className="text-2xl font-bold text-[#003333] mb-4 uppercase">
            {activeTab}
          </h2>
          <motion.div layout className="flex flex-col border-t border-gray-100">
            <AnimatePresence initial={false}>
              {visibleResources.map((row: any, index: number) => (
                <motion.div
                  key={`${activeTab}-${row.sn || index}`}
                  layout
                  initial={{ opacity: 0, height: 0, padding: 0 }}
                  animate={{ opacity: 1, height: "auto", padding: "1.5rem 0.5rem" }}
                  exit={{ opacity: 0, height: 0, padding: 0, overflow: 'hidden' }}
                  transition={{ duration: isShowingLess ? 0.8 : 0.3, ease: "easeInOut" }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 hover:bg-gray-50/50 transition-colors group rounded-lg overflow-hidden"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-[#F6F6F6] text-[#0E2455] flex items-center justify-center text-xl font-bold border border-gray-200 group-hover:bg-[#0E2455] group-hover:text-white transition-colors">
                      {row?.name?.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex flex-col max-w-xl">
                      <h3 className="text-base font-bold text-[#003333] mb-1">
                        {row?.name}
                      </h3>
                      <p className="text-sm text-gray-500 hidden sm:block">
                        Digital access to {row?.name.toLowerCase()} resources and materials.
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href={row?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 sm:mt-0 flex items-center gap-2 text-base font-bold text-gray-400 group-hover:text-orange-500 transition-colors ml-14 sm:ml-0"
                  >
                    Visit Resource <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalItems > 6 && (
            <motion.div layout className="flex justify-center mt-10">
              <button
                onClick={handleToggleShow}
                className="px-8 py-2.5 rounded-full bg-[#0E2455] text-white font-bold text-base hover:bg-orange-500 transition-colors shadow-md"
              >
                {visibleCount < totalItems ? "Load More Resources" : "Show Less"}
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar: A-Z Index */}
        <div className="hidden lg:flex w-1/4 flex-col bg-[#F6F6F6] rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
          <h3 className="text-base font-bold text-[#0E2455] mb-4">Browse A-Z</h3>
          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            <button 
              onClick={() => { setActiveLetter("All"); setVisibleCount(6); }}
              className={`w-full py-1.5 rounded-full text-sm font-bold text-center transition-colors shadow-sm ${
                activeLetter === "All" ? "bg-[#0E2455] text-white" : "bg-white text-gray-500 hover:bg-gray-200 hover:text-[#003333]"
              }`}
            >
              All
            </button>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
              <button
                key={letter}
                onClick={() => { setActiveLetter(letter); setVisibleCount(6); }}
                className={`w-full py-1.5 rounded-full text-sm font-bold text-center transition-colors shadow-sm ${
                  activeLetter === letter ? "bg-[#0E2455] text-white" : "bg-white text-gray-500 hover:bg-gray-200 hover:text-[#003333]"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1; 
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #888; 
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #555; 
            }
          `}} />
        </div>

      </div>
    </div>
  );
};

export default Resources;
