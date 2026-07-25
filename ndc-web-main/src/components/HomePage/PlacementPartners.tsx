"use client";

import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Building2 } from "lucide-react";

const PARTNERS = [
  { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Bosch", url: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Bosch_logo.svg", scaleClass: "scale-[1.8] group-hover/logo:scale-[2]" },
  { name: "Toyota", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg" },
  { name: "Capgemini", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg" },
  { name: "Accenture", url: "/images/recruiters/accenture.png" },
  { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Infosys", url: "/images/recruiters/Infosys.png", scaleClass: "scale-[1.5] group-hover/logo:scale-[1.7]" },
  { name: "TCS", url: "/images/recruiters/TCS.png" }
];

const PlacementPartners = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-navy overflow-hidden">
      {/* Dark Theme Decorative Background - Reference Site Style */}
      <div className="absolute inset-0 bg-dot-grid opacity-10" />
      
      {/* Massive Faint Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="text-[12rem] md:text-[20rem] font-black text-white whitespace-nowrap tracking-tighter">
          PLACEMENTS
        </span>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <Reveal>
          {/* Dark Theme Header */}
          <div className="text-center mb-12">
            <h3 className="text-orange font-bold text-lg mb-2 uppercase tracking-widest">Building careers, shaping futures</h3>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Trusted by leading <span className="text-orange">companies</span>
            </h2>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/10">
            {/* Enhanced Marquee Container */}
            <div className="relative flex overflow-hidden group mask-horizontal pb-4 -mb-4">
              {/* Animate Marquee */}
              <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
                {PARTNERS.map((partner, index) => (
                  <div 
                    key={index}
                    className="group/logo flex-shrink-0 w-[180px] h-[110px] border border-white/10 rounded-2xl flex items-center justify-center p-6 mx-[12px] hover:-translate-y-2 hover:border-orange/50 hover:shadow-[0_16px_40px_rgba(246,135,42,0.2)] transition-all duration-500 bg-white/10 backdrop-blur-sm"
                  >
                    <img 
                      src={partner.url} 
                      alt={partner.name}
                      className={`max-w-[120px] max-h-[60px] object-contain opacity-80 brightness-0 invert transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:brightness-100 group-hover/logo:invert-0 ${partner.scaleClass || 'scale-100 group-hover/logo:scale-110'}`}
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
                    className="group/logo flex-shrink-0 w-[180px] h-[110px] border border-white/10 rounded-2xl flex items-center justify-center p-6 mx-[12px] hover:-translate-y-2 hover:border-orange/50 hover:shadow-[0_16px_40px_rgba(246,135,42,0.2)] transition-all duration-500 bg-white/10 backdrop-blur-sm"
                  >
                    <img 
                      src={partner.url} 
                      alt={partner.name}
                      className={`max-w-[120px] max-h-[60px] object-contain opacity-80 brightness-0 invert transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:brightness-100 group-hover/logo:invert-0 ${partner.scaleClass || 'scale-100 group-hover/logo:scale-110'}`}
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-white">95%</p>
                <p className="text-sm text-gray-400 font-medium mt-1">Placement Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-white">100+</p>
                <p className="text-sm text-gray-400 font-medium mt-1">Companies</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-white">8LPA</p>
                <p className="text-sm text-gray-400 font-medium mt-1">Avg Package</p>
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
