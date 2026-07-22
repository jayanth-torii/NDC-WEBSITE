"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, FileCheck, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const ImpConsiderations = ({ data }: { data: any }) => {
  if (!data) return null;
  const { title, sections } = data;

  return (
    <div className="bg-[#0e2455] rounded-[32px] p-8 lg:p-10 shadow-xl border border-blue-900 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-14 h-14 bg-white/10 text-white rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-3xl font-extrabold text-white">{title}</h2>
      </div>

      <div className="space-y-4 relative z-10 flex-grow flex flex-col justify-center">
        {sections?.map((section: any, index: number) => {
          if (!section.pdf) return null;
          return (
            <motion.a
              key={index}
              href={section.pdf}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group/link"
            >
              <div className="flex items-center gap-4">
                <FileCheck size={24} className="text-[#f6872a]" />
                <span className="font-bold text-white text-lg">{section.title}</span>
              </div>
              <ArrowRight size={20} className="text-white/50 group-hover/link:text-white group-hover/link:translate-x-1 transition-all" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default ImpConsiderations;
