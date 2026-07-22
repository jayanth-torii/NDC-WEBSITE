"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const MentoringCell = ({ MentoringCellData }: any) => {
  const { title, description, GuideLines, table } = MentoringCellData;

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeading eyebrow="Guidance & Support" title={title} align="center" className="mb-6" />
            <p className="text-lg text-body-gray leading-relaxed">{description}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Guidelines */}
            {GuideLines && (
              <motion.div variants={itemVariants} className="lg:col-span-7">
                <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#f6872a] to-[#ff6b00]" />
                  
                  <h3 className="text-2xl font-bold text-[#0e2455] mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0">
                      <CheckCircle2 size={24} />
                    </span>
                    {GuideLines.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {GuideLines.points.map((item: string, index: number) => (
                      <div key={index} className="flex gap-4 group/item">
                        <span className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 text-[#0e2455] font-bold flex items-center justify-center shrink-0 text-sm group-hover/item:bg-[#0e2455] group-hover/item:text-white transition-colors duration-300">
                          {index + 1}
                        </span>
                        <p className="text-gray-600 leading-relaxed pt-1 group-hover/item:text-gray-900 transition-colors duration-300">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Committee Members */}
            {table && table.length > 0 && (
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <h3 className="text-2xl font-bold text-[#0e2455] mb-8">Committee Members</h3>
                <div className="grid grid-cols-1 gap-4">
                  {table.map((member: any, index: number) => (
                    <div 
                      key={index} 
                      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(246,135,42,0.08)] transition-all duration-300 flex items-center gap-5 group"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#0e2455]/5 text-[#0e2455] group-hover:bg-[#f6872a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                        <User size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h4>
                        <p className="text-sm font-medium text-[#f6872a] uppercase tracking-wider">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MentoringCell;
