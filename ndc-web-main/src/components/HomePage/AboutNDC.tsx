"use client"

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import Kicker from "@/components/ui/Kicker";
import { ArrowRight, Award, Users, BookOpen } from "lucide-react";

const AboutNDC = ({data} : any) => {
  const {title, subTitle, description, buttonText, image, link} = data

  const router = useRouter();

  return (
    <section className="relative py-24 lg:py-36 overflow-hidden bg-white">
      {/* Enhanced Decorative Background */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-br from-orange-50 to-blue-50 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-[0.02]" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-28">
          
          {/* Enhanced Image Section */}
          <Reveal className="group w-full lg:w-1/2 flex justify-center" delay={0.1}>
            <div className="relative w-full aspect-[4/3] max-w-[650px]">
              {/* Animated Background Shapes */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-navy/10 rounded-[48px] transform rotate-6 scale-105 transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:rotate-3 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-br from-navy/10 to-orange/50 rounded-[48px] transform -rotate-3 scale-95 transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:-rotate-1 group-hover:scale-100" />
              
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-[0_30px_80px_rgba(14,36,85,0.2)] border-4 border-white">
                <Image
                  src={image}
                  alt="About Nagarjuna Degree College"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
              </div>
              
              {/* Enhanced Floating Badges */}
              <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4 animate-float z-20">
                <div className="w-14 h-14 bg-gradient-to-br from-orange to-orange-dark rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                  25+
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-semibold">Years of</span>
                  <span className="text-navy font-extrabold text-lg">Excellence</span>
                </div>
              </div>

              {/* Secondary Floating Badge */}
              <div className="absolute -top-4 -left-4 md:-left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-float z-20" style={{ animationDelay: '1s' }}>
                <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-white">
                  <Award size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold">Top</span>
                  <span className="text-navy font-bold text-sm">College</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Enhanced Text Section */}
          <Reveal className="w-full lg:w-1/2 mt-16 lg:mt-0" as="div">
            <Kicker className="mb-6">About NDC</Kicker>

            <h2 className="text-4xl md:text-5xl lg:text-6xl text-navy font-extrabold leading-[1.1] tracking-tight mb-6">
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

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="text-center p-4 bg-surface-light rounded-2xl">
                <Users className="mx-auto text-navy mb-2" size={24} />
                <p className="text-sm font-semibold text-navy">Expert Faculty</p>
              </div>
              <div className="text-center p-4 bg-surface-light rounded-2xl">
                <BookOpen className="mx-auto text-navy mb-2" size={24} />
                <p className="text-sm font-semibold text-navy">Modern Labs</p>
              </div>
              <div className="text-center p-4 bg-surface-light rounded-2xl">
                <Award className="mx-auto text-navy mb-2" size={24} />
                <p className="text-sm font-semibold text-navy">NAAC Accredited</p>
              </div>
            </div>
            
            <button
              onClick={() => router.push(link || "/about-ndc")}
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-navy to-navy-dark hover:from-orange hover:to-orange-dark text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_12px_32px_rgba(14,36,85,0.3)] hover:shadow-[0_16px_40px_rgba(246,135,42,0.4)] hover:-translate-y-1"
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
