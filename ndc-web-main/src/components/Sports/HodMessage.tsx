"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const HodMessage = ({ data }: { data: any }) => {
  if (!data) return null;
  const { title, image, name, position, message } = data;

  return (
    <section className="py-20 lg:py-28 bg-gray-50 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/5 rounded-l-full blur-3xl transform translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column (Image) */}
              <div className="lg:col-span-5 relative bg-[#0e2455] p-8 lg:p-12 flex flex-col items-center justify-center">
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px'
                  }}
                />
                
                <div className="relative w-56 h-56 lg:w-64 lg:h-64 mb-8">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-40 animate-pulse" />
                  <div className="relative w-full h-full rounded-full border-4 border-white/20 overflow-hidden shadow-2xl">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{name}</h2>
                  <p className="text-orange-400 font-semibold">{position}</p>
                </div>
              </div>

              {/* Right Column (Message) */}
              <div className="lg:col-span-7 p-8 lg:p-16 relative">
                <Quote className="absolute top-8 lg:top-12 right-8 lg:right-16 w-24 h-24 text-gray-100 -z-10 transform -scale-x-100" />
                
                <div className="mb-10">
                  <span className="inline-flex items-center gap-3 text-orange-500 font-bold tracking-[2.4px] uppercase text-sm mb-4">
                    <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
                    Message
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-[#0e2455] tracking-tight">
                    {title}
                  </h3>
                </div>

                <div className="prose prose-lg max-w-none">
                  {message.map((paragraph: string, index: number) => (
                    <p key={index} className="text-[#53545b] text-[16px] leading-[1.8] font-medium mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HodMessage;
