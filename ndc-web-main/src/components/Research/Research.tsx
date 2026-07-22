"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Bookmark, ArrowUpRight, GraduationCap } from "lucide-react";
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
  if (title.toLowerCase().includes("scopus")) return <BookOpen className="text-blue-500" size={24} />;
  if (title.toLowerCase().includes("ugc")) return <GraduationCap className="text-orange-500" size={24} />;
  return <Bookmark className="text-green-500" size={24} />;
};

const Research = ({ data }: ResearchProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!data || !data.sections) return null;
  const { title, sections } = data;

  const activeSection = sections[activeTab];

  return (
    <section className="py-10 lg:py-16 bg-gray-50 relative overflow-hidden">
      {/* Decorative abstract background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#0e2455]/5 to-[#f6872a]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <SectionHeading eyebrow="Academic Excellence" title={title || "Research Publications"} align="center" className="mb-4" />
          <p className="text-lg text-gray-600 leading-relaxed">
            Exploring new frontiers of knowledge through high-quality research, published in globally recognized indexed journals.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {sections.map((section, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive ? "text-white shadow-lg" : "text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="researchTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#0e2455] to-[#1a3a7a] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {section.title}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {section.points.length}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="max-w-5xl mx-auto min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {activeSection.points.map((point, index) => {
                // Try to extract author name if it's nicely formatted (e.g., "Dr. Harish Babu S, ...")
                const splitIndex = point.indexOf(",");
                const author = splitIndex !== -1 ? point.substring(0, splitIndex) : "Author";
                const content = splitIndex !== -1 ? point.substring(splitIndex + 1).trim() : point;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#f6872a]/30 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                        {getIconForTitle(activeSection.title)}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#f6872a] group-hover:text-white transition-colors duration-300 -mr-2 -mt-2 shrink-0">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-sm font-bold text-[#f6872a] uppercase tracking-wider mb-2">
                        {author}
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-medium">
                        {content}
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        <FileText size={14} />
                        Publication
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                        {activeSection.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Research;
