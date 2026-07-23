"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const Gallery = ({ data }: { data: any }) => {
  if (!data || !data.images) return null;

  // Bento grid classes for perfectly tiling 8 images in a 4x4 desktop grid
  const getBentoClasses = (index: number) => {
    switch (index % 8) {
      case 0:
        return "col-span-2 row-span-2 md:col-span-2 md:row-span-2";
      case 1:
      case 2:
        return "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
      case 3:
        return "col-span-1 row-span-1 md:col-span-2 md:row-span-1";
      case 4:
        return "col-span-2 row-span-2 md:col-span-1 md:row-span-2";
      case 5:
        return "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
      case 6:
        return "col-span-1 row-span-1 md:col-span-2 md:row-span-2";
      case 7:
        return "col-span-2 row-span-1 md:col-span-1 md:row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-12 text-center">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center justify-center gap-3 text-orange-500 font-bold tracking-[2.4px] uppercase text-sm mb-4">
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
              Moments in Action
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0e2455] tracking-tight">
              {data.title}
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[240px] gap-4 md:gap-6">
          {data.images.map((src: string, index: number) => (
            <Reveal key={index} delay={index * 0.05} className={getBentoClasses(index)}>
              <div className="w-full h-full relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-500">
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                <Image
                  src={src}
                  alt={`Sports moment ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#0e2455]/0 group-hover:bg-[#0e2455]/20 transition-colors duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
