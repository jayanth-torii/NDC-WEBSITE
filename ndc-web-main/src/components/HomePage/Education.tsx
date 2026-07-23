"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import Kicker from "@/components/ui/Kicker";
import { ArrowRight } from "lucide-react";

const Education = ({ data } :any) => {
  const { title , description , subTitle, image, buttons} = data || {};
  const router = useRouter();

  return (
    <section className="py-20 lg:py-32 bg-gray-50 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Image Side - Left */}
          <Reveal className="w-full lg:w-1/2 flex justify-center" delay={0.2}>
            <div className="relative w-full aspect-[4/3] max-w-[600px] group">
              <div className="absolute inset-0 bg-navy rounded-[32px] transform -rotate-3 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-rotate-6" />
              <div className="absolute inset-0 bg-orange rounded-[32px] transform rotate-3 opacity-50 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:rotate-6" />
              <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-[var(--shadow-navy)] border-4 border-white z-10">
                {image && (
                  <Image
                    src={image}
                    alt="Education Programme"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-60" />
              </div>
            </div>
          </Reveal>

          {/* Content Side - Right */}
          <Reveal className="w-full lg:w-1/2">
            <Kicker className="mb-5">Academic Programs</Kicker>

            <h2 className="text-3xl md:text-5xl font-extrabold text-navy tracking-tight leading-[1.1] mb-6">
              {title}
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {description}
            </p>

            <p className="text-navy font-bold text-xl mb-6">
              {subTitle}
            </p>

            {buttons?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {buttons.map((btn: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => router.push(`/departments#${btn.url}`)}
                    className="group flex items-center gap-2 bg-white hover:bg-orange-500 border border-gray-200 hover:border-orange-500 text-gray-700 hover:text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md font-semibold text-sm"
                  >
                    {btn.title}
                    <ArrowRight size={14} className="text-gray-400 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default Education;
