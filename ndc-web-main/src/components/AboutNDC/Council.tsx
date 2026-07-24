"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const Council = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, members } = data;

  return (
    <section className="relative py-24 bg-[#FAFAFA] overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-orange-50/40 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Dot Grid Top Left */}
      <div className="absolute top-12 left-12 opacity-30 pointer-events-none hidden lg:block z-0">
        <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-council-left" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#F6872A" />
          </pattern>
          <rect width="100" height="60" fill="url(#dots-council-left)" />
        </svg>
      </div>

      {/* Dot Grid Top Right */}
      <div className="absolute top-12 right-12 opacity-30 pointer-events-none hidden lg:block z-0">
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-council-right" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#F6872A" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots-council-right)" />
        </svg>
      </div>
      
      {/* Sparkle SVG Top Right */}
      <div className="absolute top-20 right-[25%] opacity-40 pointer-events-none hidden md:block z-0 text-[#F6872A]">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2 L13.5 9 L20 10.5 L13.5 12 L12 19 L10.5 12 L4 10.5 L10.5 9 Z" />
         </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-[1300px]">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          
          {/* Top Icon */}
          <div className="relative inline-flex mb-6">
            <div className="w-[60px] h-[60px] bg-[#FFF8F3] rounded-[18px] flex items-center justify-center text-[#1a3668] border border-orange-100 shadow-[0_4px_12px_rgba(246,135,42,0.1)] relative z-10">
              <Users size={28} strokeWidth={1.5} />
            </div>
            {/* Tiny Sparks */}
            <div className="absolute -top-3 -right-3 text-[#F6872A] opacity-80">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 3v4" />
                <path d="M19 7h-4" />
                <path d="M18 3l-3 3" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] bg-[#F6872A] w-8 opacity-70" />
            <span className="text-[#F6872A] text-[13px] font-bold tracking-[0.2em] uppercase">Leadership</span>
            <div className="h-[2px] bg-[#F6872A] w-8 opacity-70" />
          </div>
          
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#1a3668] tracking-tight mb-4">
            {title || "Governing Council Members"}
          </h2>
          
          <p className="text-[#53545b] text-[16px] font-medium tracking-wide">
            Guiding with vision. Leading with excellence.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {members?.map((member: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Custom Card Icon */}
              <div className="w-[72px] h-[72px] bg-[#FFF8F3] rounded-full flex items-center justify-center mb-6 mx-auto border-[6px] border-white shadow-[0_0_0_1px_rgba(246,135,42,0.15)] shrink-0">
                <div className="w-[26px] h-[26px] border-[2.5px] border-[#1a3668] rounded-full flex items-center justify-center">
                  <div className="w-[8px] h-[8px] bg-[#1a3668] rounded-full"></div>
                </div>
              </div>

              {/* Text Content */}
              <h3 className="font-extrabold text-[#1a3668] text-[18px] mb-2 leading-snug">
                {member.name}
              </h3>
              
              <p className="text-[11px] font-extrabold text-[#F6872A] uppercase tracking-[0.1em] mb-1">
                {member.position}
              </p>
              
              {/* Divider Line with Diamond */}
              <div className="flex items-center justify-center w-full my-4 opacity-50">
                <div className="w-6 h-[1.5px] bg-[#F6872A]"></div>
                <div className="w-[5px] h-[5px] bg-[#F6872A] rotate-45 mx-1.5"></div>
                <div className="w-6 h-[1.5px] bg-[#F6872A]"></div>
              </div>

              <p className="text-[13px] text-gray-500 font-medium leading-[1.6]">
                {member.designation}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Emblem */}
        <div className="mt-20 flex items-center justify-center gap-4 opacity-70">
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <div className="w-1.5 h-1.5 bg-[#F6872A] rotate-45"></div>
            <div className="w-32 lg:w-48 h-[1px] bg-[#F6872A]"></div>
          </div>
          
          <div className="flex items-center text-[#F6872A] shrink-0">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Shield */}
              <path d="M30 15 L20 19 L20 32 C20 42 28 48 30 50 C32 48 40 42 40 32 L40 19 Z" fill="#FFF8F3" strokeWidth="2" />
              {/* Star */}
              <polygon points="30 23, 32 27, 36 27, 33 30, 34 34, 30 32, 26 34, 27 30, 24 27, 28 27" fill="none" strokeWidth="1.5" />
              {/* Left Laurel */}
              <path d="M16 42 C6 35 6 22 6 18" strokeWidth="1.5" />
              <path d="M6 30 C10 32 12 30 12 30" strokeWidth="1.5" />
              <path d="M6 36 C10 38 14 36 14 36" strokeWidth="1.5" />
              <path d="M6 24 C10 26 12 24 12 24" strokeWidth="1.5" />
              {/* Right Laurel */}
              <path d="M44 42 C54 35 54 22 54 18" strokeWidth="1.5" />
              <path d="M54 30 C50 32 48 30 48 30" strokeWidth="1.5" />
              <path d="M54 36 C50 38 46 36 46 36" strokeWidth="1.5" />
              <path d="M54 24 C50 26 48 24 48 24" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="flex items-center gap-1.5 hidden sm:flex">
            <div className="w-32 lg:w-48 h-[1px] bg-[#F6872A]"></div>
            <div className="w-1.5 h-1.5 bg-[#F6872A] rotate-45"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Council;
