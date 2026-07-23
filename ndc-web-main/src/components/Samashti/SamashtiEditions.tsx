"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Search, ChevronDown } from "lucide-react";
import PdfModal from "@/components/PdfModal";

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] text-[#f6872a] shrink-0">
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const IconOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px]">
    <path d="M14 3h7v7M21 3l-9 9M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h5" />
  </svg>
);

const SamashtiEditions = ({ data }: any) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const openPdf = (pdf: string) => {
    if (pdf && pdf !== "#" && pdf !== "") {
      setSelectedPdf(pdf);
    }
  };

  return (
    <section className="pt-[54px] pb-[64px] bg-white" id="editions">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-[22px] mb-[26px]">
          <Reveal>
            <span className="block text-[#f6872a] font-bold text-[12px] tracking-[1.5px] uppercase mb-1">
              Explore The Editions
            </span>
            <h2 className="text-[#0e2455] text-[30px] font-extrabold tracking-[-0.5px] m-[2px_0_0]">
              Browse All Editions
            </h2>
          </Reveal>

          {/* Filters */}
          <div className="flex items-center gap-[10px] flex-wrap">
            <div className="flex items-center gap-[9px] bg-white border-[1.5px] border-[#e3e8f0] rounded-[12px] px-[14px] h-[44px] min-w-[230px] focus-within:border-[#3270fc] focus-within:ring-4 focus-within:ring-[#3270fc24] transition-all">
              <Search size={17} className="text-[#9aa3b5] shrink-0" />
              <input 
                type="text" 
                placeholder="Search editions..." 
                className="border-none outline-none bg-transparent text-[14px] text-[#1b2440] w-full"
              />
            </div>
            
            {["All Volumes", "All Years", "All Categories"].map((label, idx) => (
              <button key={idx} className="flex items-center gap-[10px] h-[44px] px-[14px] bg-white border-[1.5px] border-[#e3e8f0] rounded-[12px] text-[#0e2455] text-[13.5px] font-bold hover:border-[#c2ccdf] transition-colors">
                {label}
                <ChevronDown size={15} className="text-[#9aa3b5]" />
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[22px]">
          {(showAll ? data?.Editions : data?.Editions?.slice(0,8))?.map((edition: any, index: number) => {
            const volMatch = edition.title.match(/Edition (\d+)/i);
            const vol = volMatch ? volMatch[1] : (12 - index); // Fallback

            return (
            <Reveal key={index} delay={0.1 * (index % 4)}>
              <div 
                className="group flex flex-col bg-white rounded-[16px] overflow-hidden border border-[#eef1f6] shadow-[0_12px_30px_rgba(15,18,22,0.06)] hover:shadow-[0_26px_50px_rgba(15,18,22,0.13)] hover:-translate-y-[6px] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-[#0e2455] to-[#0a1a3f] overflow-hidden block">
                  <Image 
                    src={edition.imageUrl} 
                    alt={edition.title} 
                    fill 
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  />
                  <div className="absolute top-[12px] left-[12px] bg-[#f6872a] text-white text-[11.5px] font-extrabold px-[11px] py-[4px] rounded-full shadow-[0_6px_14px_rgba(246,135,42,0.35)] z-10">
                    Vol {vol}
                  </div>
                </div>

                {/* Content */}
                <div className="p-[16px_16px_18px] flex flex-col flex-grow">
                  <div className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[#777] mb-[7px]">
                    <IconCalendar />
                    {edition.date}
                  </div>
                  <h3 className="text-[15.5px] font-extrabold text-[#0e2455] leading-[1.3] m-[0_0_14px]">
                    Samashti — Volume {vol}
                  </h3>
                  
                  <button 
                    onClick={() => openPdf(edition.pdfUrl)}
                    className="mt-auto w-full p-[11px_14px] bg-[#f6872a] text-white text-[13.5px] font-bold rounded-[10px] flex items-center justify-center gap-[8px] hover:bg-[#e2761d] transition-colors"
                  >
                    Read Edition <IconOpen />
                  </button>
                </div>
              </div>
            </Reveal>
            )
          })}
        </div>
        
        {/* Bottom CTA */}
        {data?.Editions?.length > 8 && (
          <div className="text-center mt-[26px]">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-[9px] bg-[#0e2455] text-white p-[12px_26px] rounded-full text-[14px] font-bold shadow-[0_14px_30px_rgba(14,36,85,0.22)] hover:bg-[#15306d] hover:-translate-y-[2px] transition-all"
            >
              {showAll ? "Show Less" : "View More Editions"}
              <svg className={`w-[17px] h-[17px] transition-transform duration-300 ${showAll ? '-rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        )}
      </div>
      <PdfModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
    </section>
  );
};

export default SamashtiEditions;
