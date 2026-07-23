"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Contact({ data }: any) {
  if (!data) return null;
  const { title, description, image } = data;

  return (
    <div className="w-[90%] mx-auto mb-16">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
      >
        {/* Subtle background graphic */}
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#F6F6F6] rounded-full z-0"></div>

        {/* Text Section */}
        <div className="relative z-10 w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-[#003333] mb-4 border-b-2 border-[#0E2455] pb-2 inline-block">
            {title}
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2">
            {description?.map((each: any, id: number) => (
              <div key={id} className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0E2455] text-white font-bold text-xs shrink-0">
                  {id + 1}
                </span>
                <p className="text-base text-[#003333] font-medium">
                  {each}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section - Compact Circular/Square */}
        {image && (
          <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 shrink-0">
             <Image 
               src={image} 
               alt="Contact Library" 
               fill 
               className="object-cover rounded-full border-4 border-[#F6F6F6] shadow-sm" 
             />
          </div>
        )}

      </motion.div>
    </div>
  );
}
