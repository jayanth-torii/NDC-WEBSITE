"use client";

import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Building2 } from "lucide-react";

const PARTNERS = [
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Bosch", url: "/images/recruiters/Bosch.png" },
  { name: "Toyota", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg" },
  { name: "Capgemini", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg" },
  { name: "Accenture", url: "/images/recruiters/accenture.png" },
  { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Infosys", url: "/images/recruiters/Infosys.png" },
  { name: "TCS", url: "/images/recruiters/TCS.png" }
];

const PlacementPartners = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-surface-light to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <Reveal>
          <div className="bg-white rounded-[32px] p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100">
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange/10 to-orange/20 flex items-center justify-center">
                <Building2 size={24} className="text-orange" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
                Our Placement Partners
              </h2>
            </div>
            
            {/* Enhanced Marquee Container */}
            <div className="relative flex overflow-hidden group mask-horizontal pb-4 -mb-4">
              {/* Animate Marquee */}
              <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
                {PARTNERS.map((partner, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-[180px] h-[110px] border border-gray-200 rounded-2xl flex items-center justify-center p-6 mx-[12px] hover:-translate-y-2 hover:border-orange/30 hover:shadow-[0_16px_40px_rgba(246,135,42,0.15)] transition-all duration-500 bg-white"
                  >
                    <img 
                      src={partner.url} 
                      alt={partner.name}
                      className="max-w-[120px] max-h-[60px] object-contain opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-105"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Duplicate for seamless loop */}
              <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]" aria-hidden="true">
                {PARTNERS.map((partner, index) => (
                  <div 
                    key={`dup-${index}`}
                    className="flex-shrink-0 w-[180px] h-[110px] border border-gray-200 rounded-2xl flex items-center justify-center p-6 mx-[12px] hover:-translate-y-2 hover:border-orange/30 hover:shadow-[0_16px_40px_rgba(246,135,42,0.15)] transition-all duration-500 bg-white"
                  >
                    <img 
                      src={partner.url} 
                      alt={partner.name}
                      className="max-w-[120px] max-h-[60px] object-contain opacity-80 transition-all duration-300 hover:opacity-100 hover:scale-105"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-gray-100">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-navy">95%</p>
                <p className="text-sm text-gray-500 font-medium mt-1">Placement Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-navy">100+</p>
                <p className="text-sm text-gray-500 font-medium mt-1">Companies</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-navy">8LPA</p>
                <p className="text-sm text-gray-500 font-medium mt-1">Avg Package</p>
              </div>
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
          animation: marquee 30s linear infinite;
        }
        .mask-horizontal {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
      `}} />
    </section>
  );
};

export default PlacementPartners;
