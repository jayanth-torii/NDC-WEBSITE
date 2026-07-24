"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, Award, Clock, TrendingUp } from "lucide-react";

const CertificateCourses = ({data}:any) => {
  const {title, image, link} = data;
  const router = useRouter();

  return (
    <section className="relative py-20 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px bg-orange w-16" />
            <div className="flex items-center gap-2 text-orange font-bold text-sm tracking-widest uppercase">
              <Award size={18} />
              <span>Professional Certification</span>
            </div>
            <div className="h-px bg-orange w-16" />
          </div>
        </Reveal>

        {/* Bento Grid */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            
            {/* Left Column (Cols 1-5) */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
              
              {/* Top Text Block */}
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden h-[60%] flex flex-col justify-center">
                {/* Decorative Dots Top Right */}
                <div className="absolute top-8 right-8 opacity-40">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="2" fill="#F97316" />
                    </pattern>
                    <rect x="0" y="0" width="40" height="40" fill="url(#dots)" />
                  </svg>
                </div>
                
                {/* Decorative concentric circles bottom left */}
                <div className="absolute -bottom-16 -left-16 opacity-20 pointer-events-none">
                  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="75" cy="75" r="74" stroke="#F97316" strokeWidth="1" />
                    <circle cx="75" cy="75" r="54" stroke="#F97316" strokeWidth="1" />
                    <circle cx="75" cy="75" r="34" stroke="#F97316" strokeWidth="1" />
                  </svg>
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight tracking-tight mb-4 relative z-10">
                  Explore Certificate <br/> <span className="text-orange">Courses</span>
                </h2>
                <p className="text-gray-500 font-medium leading-relaxed max-w-sm relative z-10 text-[15px]">
                  Enhance your career prospects with our industry-recognized certificate programs designed for real-world success.
                </p>
              </div>

              {/* Bottom Two Cards */}
              <div className="grid grid-cols-2 gap-6 h-[40%]">
                {/* 3-6 Months Card */}
                <div className="bg-[#FFF8F3] rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm border border-orange/10 relative overflow-hidden">
                  <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center text-white mb-3 shadow-md">
                    <Clock size={22} />
                  </div>
                  <div className="text-navy font-bold text-lg mb-1">3 - 6 Months</div>
                  <div className="text-gray-500 text-xs font-medium mb-3">Fast-Track Duration</div>
                  <div className="w-8 h-1 bg-orange rounded-full" />
                </div>

                {/* 100% Placement Card */}
                <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="w-12 h-12 bg-[#2D459D] rounded-full flex items-center justify-center text-white mb-3 shadow-md">
                    <Award size={22} />
                  </div>
                  <div className="text-navy font-bold text-lg mb-1">100%</div>
                  <div className="text-gray-500 text-xs font-medium mb-3">Placement Assistance</div>
                  <div className="w-8 h-1 bg-[#2D459D] rounded-full" />
                </div>
              </div>
            </div>

            {/* Right Column (Cols 6-12) - Massive Image */}
            <div className="col-span-1 lg:col-span-7 relative h-[500px] lg:h-auto rounded-[32px] overflow-hidden shadow-lg">
              <img
                src={image || "/images/placeholders/certificate.jpg"}
                alt="Students studying"
                className="w-full h-full object-cover"
              />
              
              {/* Top Right Floating Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="text-navy">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-navy font-bold text-sm leading-tight">5,000+</span>
                  <span className="text-gray-500 text-[10px] leading-tight">Learners Enrolled</span>
                </div>
              </div>
              
              {/* Decorative Orange Slash */}
              <div className="absolute bottom-0 right-0 w-full h-1/2 pointer-events-none overflow-hidden">
                 <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange rotate-45 transform translate-x-1/2 translate-y-1/2 shadow-[0_0_50px_rgba(249,115,22,0.8)] blur-[2px]" />
                 <div className="absolute bottom-10 right-10 w-full h-1 bg-orange/80 rotate-[-30deg] transform origin-bottom-right" />
              </div>

              {/* Bottom Floating Navy Bar */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#2D3650] rounded-2xl p-4 pr-6 flex flex-col sm:flex-row items-center justify-between shadow-2xl backdrop-blur-sm z-10 border border-white/10">
                
                {/* Left side of Navy Bar */}
                <div className="flex items-center gap-4 mb-4 sm:mb-0 border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0 sm:pr-8 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-orange flex items-center justify-center text-white shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg leading-tight">10+</span>
                    <span className="text-gray-300 text-xs font-medium">Specialized Tracks</span>
                  </div>
                </div>

                {/* Right side of Navy Bar */}
                <div className="flex items-center gap-6 justify-between w-full sm:w-auto sm:pl-4">
                  <div className="flex flex-col">
                    <span className="text-white text-sm">Learn today,</span>
                    <span className="text-white font-bold text-lg leading-tight"><span className="text-orange">Lead</span> tomorrow.</span>
                  </div>
                  <button onClick={() => router.push(link || "#")} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-navy shrink-0 hover:bg-orange hover:text-white transition-colors">
                    <ArrowUpRight size={20} className="rotate-45" />
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Wide Box - Pixel Perfect to Screenshot */}
          <div className="bg-white rounded-[32px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            
            {/* Left Content */}
            <div className="flex items-center gap-6 relative z-10 w-full md:w-auto pl-2">
              <div className="w-[85px] h-[85px] bg-[#1a3668] rounded-[28px] flex items-center justify-center text-white shrink-0 shadow-[0_20px_35px_-10px_rgba(26,54,104,0.6)] relative z-10">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[28px] font-extrabold text-[#1a3668] tracking-tight mb-1">
                  Ready to <span className="text-[#F6872A]">Upskill?</span>
                </h3>
                <p className="text-gray-500 font-medium text-[15px] max-w-[420px] leading-relaxed">
                  Join thousands of successful alumni and take the next step toward a brighter future.
                </p>
              </div>
            </div>

            {/* Right Button & Decorations */}
            <div className="relative z-10 shrink-0 pr-4 mt-8 md:mt-0">
               {/* Exact Image Decoration (Top Left of Button) */}
               <div className="absolute -top-12 -left-8 w-[60px] opacity-80 mix-blend-multiply pointer-events-none">
                 <img src="/images/decor/squiggle.png" alt="decoration" className="w-full h-auto" />
               </div>
               
              <button 
                onClick={() => router.push(link || "#")}
                className="bg-[#F6872A] hover:bg-[#e0751f] text-white font-semibold text-[16px] px-8 py-3.5 rounded-full shadow-[0_12px_24px_-8px_rgba(246,135,42,0.8)] transition-all flex items-center gap-2"
              >
                Explore Programs
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

        </Reveal>
      </div>
    </section>
  )
}

export default CertificateCourses
