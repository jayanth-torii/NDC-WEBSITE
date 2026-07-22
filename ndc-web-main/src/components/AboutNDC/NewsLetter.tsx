"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, MailOpen } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const NewsLetter = ({ data }: { data: any }) => {
  if (!data) return null;
  const { title, sections } = data;

  return (
    <div className="bg-white rounded-[32px] p-8 lg:p-10 shadow-lg border border-gray-100 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-14 h-14 bg-[#f6872a] text-white rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
          <MailOpen size={28} />
        </div>
        <h2 className="text-3xl font-extrabold text-[#0e2455]">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {sections?.map((section: any, index: number) => {
          if (!section.pdf) return null;
          return (
            <motion.a
              key={index}
              href={section.pdf}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#f6872a]/50 hover:bg-orange-50/30 transition-all duration-300 group/link"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-400 group-hover/link:text-[#f6872a] transition-colors" />
                <span className="font-semibold text-[#0e2455]">{section.title}</span>
              </div>
              <Download size={18} className="text-gray-400 group-hover/link:text-[#f6872a] transition-colors" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default NewsLetter;
