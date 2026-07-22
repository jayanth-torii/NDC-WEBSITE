"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Clock, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const Courses = ({ data }: { data: any }) => {
  if (!data) return null;
  const { title, tabsCourses } = data;
  const [activeTab, setActiveTab] = useState(tabsCourses?.[0]?.tabTitle);

  const activeData = tabsCourses.find((tab: any) => tab.tabTitle === activeTab)?.rowContent || [];

  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeading eyebrow="Find Your Path" title={title} align="center" className="mb-6" />
          <p className="text-lg text-body-gray leading-relaxed">
            Explore our comprehensive undergraduate and postgraduate programs designed to build your future.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabsCourses?.map(({ tabTitle }: any) => {
            const isActive = activeTab === tabTitle;
            return (
              <button
                key={tabTitle}
                onClick={() => setActiveTab(tabTitle)}
                className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive ? "text-white shadow-lg" : "text-gray-600 bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="courseTabBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#0e2455] to-[#1a3a7a] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <GraduationCap size={18} className={isActive ? "text-white" : "text-gray-400"} />
                  {tabTitle.replace("Courses & Eligibility Criteria For ", "")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        <div className="max-w-6xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {activeData.map(({ course, eligibility, duration }: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#f6872a]/30 transition-all duration-300 flex flex-col h-full relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full transition-transform duration-500 group-hover:scale-110 -z-0" />
                  
                  <div className="relative z-10 flex-grow">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <h3 className="text-2xl font-bold text-[#0e2455] pr-8">{course}</h3>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-[#f6872a] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CheckCircle2 size={16} /> Eligibility Criteria
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {eligibility}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#0e2455] font-semibold bg-[#0e2455]/5 px-4 py-2 rounded-lg">
                      <Clock size={18} className="text-[#f6872a]" />
                      Duration: {duration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Courses;
