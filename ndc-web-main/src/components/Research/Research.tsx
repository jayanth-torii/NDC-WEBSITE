"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, GraduationCap, Bookmark, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface Section {
  title: string;
  points: string[];
}

interface ResearchProps {
  data?: {
    title?: string;
    sections?: Section[];
  };
}

const getIconForTitle = (title: string) => {
  if (title.toLowerCase().includes("scopus")) return <BookOpen className="text-gray-500" size={16} strokeWidth={2} />;
  if (title.toLowerCase().includes("ugc")) return <GraduationCap className="text-gray-500" size={16} strokeWidth={2} />;
  return <Bookmark className="text-gray-500" size={16} strokeWidth={2} />;
};

const Research = ({ data }: ResearchProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");

  if (!data || !data.sections) return null;
  const { title, sections } = data;

  const activeSection = sections[activeTab];

  // Filter logic
  const filteredPoints = useMemo(() => {
    if (!searchQuery.trim()) return activeSection.points;
    const lowerQuery = searchQuery.toLowerCase();
    return activeSection.points.filter((point) => point.toLowerCase().includes(lowerQuery));
  }, [activeSection, searchQuery]);

  return (
    <section className="py-12 lg:py-20 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionHeading eyebrow="Publications" title={title || "Research"} className="mb-2" />
            <p className="text-gray-500 text-[15px] max-w-xl leading-relaxed">
              Exploring new frontiers of knowledge through high-quality research, published in globally recognized indexed journals.
            </p>
          </div>
          
          {/* Search Input */}
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-accent transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search publications or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-heading placeholder-gray-400 focus:outline-none focus:ring-[3px] focus:ring-blue-accent/10 focus:border-blue-accent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Segmented Control (Tabs) */}
        <div className="flex overflow-x-auto no-scrollbar mb-8 pb-2">
          <div className="inline-flex p-1 space-x-1 bg-gray-100 border border-gray-200/80 rounded-xl">
            {sections.map((section, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(index);
                    setSearchQuery("");
                  }}
                  className={`relative flex items-center gap-2 px-5 py-2 text-[14px] font-medium rounded-[8px] transition-colors duration-200 whitespace-nowrap ${
                    isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="segmentIndicator"
                      className="absolute inset-0 bg-white rounded-[8px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-gray-200/50"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{section.title}</span>
                  <span className={`relative z-10 px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide transition-colors ${isActive ? 'bg-gray-100 text-gray-600' : 'bg-gray-200/60 text-gray-400'}`}>
                    {section.points.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5"
            >
              {filteredPoints.length > 0 ? (
                filteredPoints.map((point, index) => {
                  const splitIndex = point.indexOf(",");
                  const author = splitIndex !== -1 ? point.substring(0, splitIndex) : "Author";
                  const content = splitIndex !== -1 ? point.substring(splitIndex + 1).trim() : point;

                  return (
                    <div
                      key={index}
                      className="group flex flex-col justify-between bg-white rounded-xl p-5 lg:p-6 border border-gray-200 shadow-sm hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-300 h-full"
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-[12px] font-semibold text-gray-600 uppercase tracking-wider">
                            {getIconForTitle(activeSection.title)}
                            {activeSection.title}
                          </span>
                          <button className="text-gray-300 group-hover:text-blue-accent transition-colors bg-gray-50 group-hover:bg-blue-accent/5 p-1.5 rounded-md border border-transparent group-hover:border-blue-accent/10">
                            <ExternalLink size={16} strokeWidth={2} />
                          </button>
                        </div>
                        
                        <h3 className="text-[15px] font-semibold text-heading mb-2 leading-snug">
                          {author}
                        </h3>
                        <p className="text-[14px] text-body-gray leading-relaxed line-clamp-4">
                          {content}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4 border border-gray-200">
                    <Search className="text-gray-400" size={20} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-heading mb-1.5">No publications found</h3>
                  <p className="text-[14px] text-gray-500">
                    We couldn't find anything matching "{searchQuery}".
                  </p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="mt-5 text-[13px] font-semibold text-blue-accent hover:text-blue-600 bg-blue-accent/5 hover:bg-blue-accent/10 px-4 py-2 rounded-lg transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Research;
