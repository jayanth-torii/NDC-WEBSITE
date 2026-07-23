"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, Award, Clock, TrendingUp } from "lucide-react";

const CertificateCourses = ({data}:any) => {
  const {title, image, link} = data;
  const router = useRouter();

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-surface-light to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-4">
              Skill-Based Learning
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Enhance your career prospects with industry-recognized certificate programs
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            onClick={() => router.push(link)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && router.push(link)}
            className="group relative w-full aspect-[21/9] md:aspect-[32/9] cursor-pointer overflow-hidden rounded-[40px] shadow-[0_30px_80px_rgba(14,36,85,0.15)] transition-all duration-700 hover:shadow-[0_40px_100px_rgba(14,36,85,0.25)] hover:-translate-y-2 bg-gradient-to-br from-navy to-navy-dark"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent z-10" />
            
            <img
              src={image}
              alt={title || "Explore Certificate Courses"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-105"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-center p-8 md:p-12 lg:p-16">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 bg-orange/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Award size={18} className="text-orange" />
                  <span className="text-orange font-semibold text-sm">Industry Certified</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                  {title || "Explore Certificate Courses"}
                </h3>
                <p className="text-white/80 text-lg mb-6">
                  Short-term programs designed for immediate career impact
                </p>
                
                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                    <Clock size={16} className="text-orange" />
                    <span className="text-white text-sm font-medium">3-6 Months</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full">
                    <TrendingUp size={16} className="text-orange" />
                    <span className="text-white text-sm font-medium">Career Boost</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <span className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange to-orange-dark text-white shadow-[0_12px_32px_rgba(246,135,42,0.4)] transition-all duration-300 ease-[var(--ease-editorial)] group-hover:scale-110 group-hover:shadow-[0_16px_40px_rgba(246,135,42,0.5)]">
              <ArrowUpRight size={28} />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CertificateCourses
