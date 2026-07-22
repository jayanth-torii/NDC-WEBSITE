"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle } from "lucide-react";
import PlacementPartners from "./PlacementPartners";
import SectionHeading from "@/components/ui/SectionHeading";

const CareerAdvancementCenter = ({ data }: any) => {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
    <section className="py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto mb-16">
            <SectionHeading eyebrow="Shaping Futures" title={data.title} align="center" className="mb-6" />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Image Side */}
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f6872a] to-orange-300 rounded-[32px] blur-xl opacity-20 transform -rotate-3 scale-105" />
              <img 
                src={data.image} 
                alt="Career Advancement Center" 
                className="relative w-full h-[50vh] lg:h-[60vh] object-cover rounded-[32px] shadow-2xl border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hidden md:flex">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <Target size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">100%</p>
                  <p className="text-sm text-gray-500 font-medium">Placement Assistance</p>
                </div>
              </div>
            </motion.div>

            {/* Text Content Side */}
            <motion.div variants={itemVariants} className="space-y-10">
              {data.sections?.map((section: any, index: number) => (
                <div key={index} className="relative">
                  {section.title && section.title.includes('predict the future') ? (
                    <blockquote className="text-2xl lg:text-3xl font-bold text-[#0e2455] leading-tight mb-6 relative">
                      <span className="absolute -top-6 -left-6 text-6xl text-orange-200 opacity-50 font-serif">"</span>
                      {section.title}
                    </blockquote>
                  ) : (
                    section.title && <h3 className="text-2xl font-bold text-[#0e2455] mb-4">{section.title}</h3>
                  )}
                  
                  {section.description && (
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {section.description}
                    </p>
                  )}
                  
                  {section.list && section.list.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {section.list.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <CheckCircle className="text-[#f6872a] shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-700 font-medium text-sm leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Placement Partners */}
          <motion.div variants={itemVariants} className="bg-white rounded-[32px] p-8 lg:p-12 shadow-sm border border-gray-100">
            <PlacementPartners images={data.PlacementPartnersImages} />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default CareerAdvancementCenter;
