"use client"

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import Kicker from "@/components/ui/Kicker";
import { ArrowRight } from "lucide-react";

const AboutNDC = ({data} : any) => {
  const {title, subTitle, description, buttonText, image, link} = data

  const router = useRouter();

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Section */}
          <Reveal className="group w-full lg:w-1/2 flex justify-center" delay={0.1}>
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-[600px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-navy/10 rounded-[40px] transform rotate-3 scale-105 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:rotate-1" />
              <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-[var(--shadow-navy)] border-8 border-white">
                <Image
                  src={image}
                  alt="About Nagarjuna Degree College"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4 animate-float">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange font-bold text-xl">
                  25+
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-semibold">Years of</span>
                  <span className="text-navy font-extrabold text-lg">Excellence</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text Section */}
          <Reveal className="w-full lg:w-1/2 mt-12 lg:mt-0" as="div">
            <Kicker className="mb-5">About NDC</Kicker>

            <h2 className="text-3xl md:text-5xl text-navy font-extrabold leading-[1.1] tracking-tight mb-6">
              {title}
            </h2>

            <h3 className="text-xl md:text-2xl text-orange font-bold leading-snug mb-8">
              {subTitle}
            </h3>
            
            <div className="space-y-6 mb-10">
              {description?.map((text : any, index: any) => (
                <p key={index} className="text-lg text-gray-600 leading-relaxed">
                  {text}
                </p>
              ))}
            </div>
            
            <button
              onClick={() => router.push(link || "/about-ndc")}
              className="group inline-flex items-center gap-4 bg-navy hover:bg-orange text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-[var(--shadow-navy)] hover:shadow-[var(--shadow-cta)] hover:-translate-y-1"
            >
              {buttonText}
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default AboutNDC;
