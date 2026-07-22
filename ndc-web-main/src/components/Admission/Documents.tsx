"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, FileText, BadgeInfo } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const Documents = ({ data }: any) => {
  const { title, tabs } = data;
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  if (!tabs || tabs.length === 0) return null;
  const activeTab = tabs[activeTabIndex];

  return (
    <section className="py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading eyebrow="Preparation" title={title || "Important Documents"} align="center" className="mb-6" />
          <p className="text-lg text-gray-600 leading-relaxed">
            Ensure you have the following documents ready before beginning your application or visiting the campus.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab: any, index: number) => {
            const isActive = activeTabIndex === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTabIndex(index)}
                className={`relative px-8 py-3 rounded-full text-base font-bold transition-all duration-300 ${
                  isActive ? "text-white shadow-lg" : "text-gray-600 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="docTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#f6872a] to-[#ff6b00] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <FileText size={18} className={isActive ? "text-white" : "text-gray-400"} />
                  {tab.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Checklist */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
            >
              <div className="flex items-start gap-4 mb-10 bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                <BadgeInfo className="text-blue-500 shrink-0 mt-0.5" size={24} />
                <p className="text-[#0e2455] text-lg font-medium leading-relaxed">{activeTab.note}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {activeTab.content?.map((item: string, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 group-hover:bg-[#f6872a] group-hover:text-white group-hover:border-[#f6872a] text-[#f6872a] transition-colors duration-300">
                      <FileCheck size={20} />
                    </div>
                    <span className="text-gray-700 leading-relaxed pt-1.5 font-medium group-hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Documents;
