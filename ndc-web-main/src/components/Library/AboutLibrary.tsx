"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, BookMarked, Layers } from "lucide-react";

export default function AboutLibrary({ data }: { data: any }) {
  const aboutText = data?.aboutText || [];
  const sections = data?.dropdowns || [];
  const title = data?.title || "About Library";

  const getSectionIcon = (title: string) => {
    if (title.toLowerCase().includes("service")) return <Layers className="w-6 h-6" />;
    if (title.toLowerCase().includes("collection")) return <BookMarked className="w-6 h-6" />;
    return <Info className="w-6 h-6" />;
  };

  return (
    <div className="w-[90%] mx-auto mb-16 pt-8">
      <div className="max-w-4xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-10 h-1 bg-orange-500 rounded-full" />
          <h1 className="text-2xl font-extrabold text-[#0E2455] uppercase tracking-wider">
            {title}
          </h1>
        </motion.div>
        
        <div className="space-y-4 border-l-2 border-gray-100 pl-6 md:pl-8">
          {aboutText.map((paragraph: string, index: number) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-base text-[#003333] leading-relaxed text-justify"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {sections.map((section: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-[#F6F6F6] rounded-[2rem] p-8 md:p-10 border border-gray-100 flex flex-col hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white text-[#0E2455] flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                {getSectionIcon(section.title)}
              </div>
              <h2 className="text-2xl font-bold text-[#003333]">
                {section.title}
              </h2>
            </div>
            
            <ul className="space-y-4">
              {(section.content?.[0]?.items || []).map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <p className="text-base text-gray-600 leading-relaxed font-medium">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
