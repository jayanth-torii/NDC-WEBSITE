"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Kicker from "@/components/ui/Kicker";
import { ArrowRight, GraduationCap, Briefcase, BookOpen } from "lucide-react";

const Education = ({ data } :any) => {
  const { title , description , subTitle, image, buttons} = data || {};
  const router = useRouter();

  const programs = [
    { icon: GraduationCap, title: "UG Programmes", count: "15+", desc: "Bachelor's degrees" },
    { icon: Briefcase, title: "PG Programmes", count: "8+", desc: "Master's degrees" },
    { icon: BookOpen, title: "Certificate", count: "20+", desc: "Skill courses" }
  ];

  return (
    <section className="relative py-24 lg:py-36 bg-gradient-to-b from-white to-surface-light overflow-hidden">
      {/* Enhanced Decorative Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.02]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-navy/5 to-blue-50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange/5 to-yellow-50 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-28 items-center">
          
          {/* Enhanced Image Side - Left */}
          <Reveal className="w-full lg:w-1/2 flex justify-center" delay={0.2}>
            <div className="relative w-full aspect-[4/3] max-w-[650px] group">
              {/* Animated Background Shapes */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-dark rounded-[40px] transform -rotate-6 scale-105 transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:-rotate-3 group-hover:scale-100" />
              <div className="absolute inset-0 bg-gradient-to-br from-orange to-orange-dark rounded-[40px] transform rotate-6 opacity-40 transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:rotate-3 group-hover:scale-100" />
              
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-[36px] overflow-hidden shadow-[0_40px_100px_rgba(14,36,85,0.2)] border-4 border-white z-10">
                {image && (
                  <Image
                    src={image}
                    alt="Education Programme"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-float z-20">
                <div className="w-12 h-12 bg-gradient-to-br from-orange to-orange-dark rounded-xl flex items-center justify-center text-white">
                  <GraduationCap size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-semibold">Total</span>
                  <span className="text-navy font-extrabold text-lg">40+ Programs</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Enhanced Content Side - Right */}
          <Reveal className="w-full lg:w-1/2">
            <Kicker className="mb-6">Academic Programs</Kicker>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-[1.1] mb-6">
              {title}
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {description}
            </p>

            <p className="text-navy font-bold text-xl mb-10">
              {subTitle}
            </p>

            {/* Program Cards Grid */}
            <RevealGroup className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {programs.map((program, index) => {
                const Icon = program.icon;
                return (
                  <RevealItem key={index}>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange/20 transition-all duration-300 hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mb-4 group-hover:bg-orange/10 transition-colors">
                        <Icon size={24} className="text-navy group-hover:text-orange transition-colors" />
                      </div>
                      <p className="text-2xl font-extrabold text-navy mb-1">{program.count}</p>
                      <p className="text-sm font-semibold text-navy mb-1">{program.title}</p>
                      <p className="text-xs text-gray-500">{program.desc}</p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            {buttons?.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {buttons.map((btn: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => router.push(`/departments#${btn.url}`)}
                    className="group flex items-center gap-3 bg-gradient-to-r from-navy to-navy-dark hover:from-orange hover:to-orange-dark border border-transparent text-white px-7 py-4 rounded-2xl transition-all duration-300 shadow-[0_12px_32px_rgba(14,36,85,0.25)] hover:shadow-[0_16px_40px_rgba(246,135,42,0.35)] hover:-translate-y-1 font-semibold"
                  >
                    {btn.title}
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-all" />
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
