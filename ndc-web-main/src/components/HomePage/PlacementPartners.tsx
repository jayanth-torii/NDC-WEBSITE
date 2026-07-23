"use client";

import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Placeholder data since no logos were provided
const PARTNERS = [
  "Infosys", "Wipro", "TCS", "Accenture", "Cognizant", 
  "Capgemini", "IBM", "Tech Mahindra", "HCL", "Dell", 
  "Amazon", "Flipkart"
];

const PlacementPartners = () => {
  return (
    <section className="py-20 md:py-28 overflow-hidden bg-surface-light border-y border-card-border relative">
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <header className="mb-14 text-center">
          <SectionHeading title="Our Top Recruiters" className="mb-2 justify-center" />
          <p className="text-body-gray text-[17px] font-medium max-w-2xl mx-auto mt-4">
            We are proud to partner with leading companies that trust our institution for their talent acquisition.
          </p>
        </header>

        <Reveal>
          {/* Marquee Container */}
          <div className="relative flex overflow-x-hidden group mask-horizontal py-4">
            {/* Animate Marquee */}
            <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
              {PARTNERS.map((partner, index) => (
                <div 
                  key={index} 
                  className="mx-4 md:mx-6 flex items-center justify-center h-24 px-10 bg-white rounded-2xl border border-card-border shadow-sm text-navy/80 font-black text-2xl tracking-tight transition-all duration-300 hover:text-orange hover:border-orange/30 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 cursor-default"
                >
                  {partner}
                </div>
              ))}
            </div>
            
            {/* Duplicate for seamless loop */}
            <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]" aria-hidden="true">
              {PARTNERS.map((partner, index) => (
                <div 
                  key={`dup-${index}`} 
                  className="mx-4 md:mx-6 flex items-center justify-center h-24 px-10 bg-white rounded-2xl border border-card-border shadow-sm text-navy/80 font-black text-2xl tracking-tight transition-all duration-300 hover:text-orange hover:border-orange/30 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 cursor-default"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .mask-horizontal {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
    </section>
  );
};

export default PlacementPartners;
