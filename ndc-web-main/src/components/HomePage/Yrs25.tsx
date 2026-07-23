"use client";
import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import Kicker from "@/components/ui/Kicker";
import { Award, TrendingUp, Users, Star } from "lucide-react";

const Yrs25 = ({ data }: any) => {
  const imageSrc = "/images/about-nagarjuna/25yrs-image.png";
  const heading = data.title || "Celebrating 25 Years of Academic Excellence";
  const description = data.description;

  const renderHeading = (text: string) => {
    if (text.includes("Excellence")) {
      const parts = text.split("Excellence");
      return (
        <>
          {parts[0]}
          <span className="text-orange">Excellence</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  const milestones = [
    { icon: Users, label: "2000+ Alumni", value: "2000+" },
    { icon: Award, label: "Top College", value: "#1" },
    { icon: TrendingUp, label: "Growth Rate", value: "95%" },
    { icon: Star, label: "Student Satisfaction", value: "4.8" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface-tint via-white to-orange-50 py-24 lg:py-32" aria-labelledby="anniversary-title">
      {/* Enhanced Decorative Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.04] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]" aria-hidden="true" />
      <div className="absolute top-1/4 -left-40 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-100 to-orange-200/30 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-40 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-navy/10 to-blue-100/30 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal className="flex justify-center order-2 lg:order-1">
            <div className="group relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              {/* Animated Background Shapes */}
              <span className="absolute inset-[-8%] rounded-[40px] bg-gradient-to-br from-navy to-navy-dark rotate-[-12deg] shadow-[0_40px_100px_rgba(14,36,85,0.25)] transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:rotate-0" />
              <span className="absolute w-[88%] h-[88%] rounded-full border-[4px] border-white/60" />
              <div className="absolute w-[76%] h-[76%] rounded-full border-[2px] border-orange/30" />
              
              {/* Main Image */}
              <div className="relative w-[72%] aspect-square rounded-full overflow-hidden shadow-[0_30px_80px_rgba(14,36,85,0.35)] animate-float border-4 border-white">
                <img src={imageSrc} alt={heading} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_3px_rgba(255,255,255,0.3),inset_0_16px_40px_rgba(255,255,255,0.15)]" />
              </div>

              {/* Enhanced Floating Badge */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white px-6 py-4 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4 z-20">
                <div className="w-14 h-14 bg-gradient-to-br from-orange to-orange-dark rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                  25
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-semibold">Years of</span>
                  <span className="text-navy font-extrabold text-lg">Milestones</span>
                </div>
              </div>

              {/* Secondary Decorative Elements */}
              <div className="absolute -top-6 right-0 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 animate-float z-20" style={{ animationDelay: '1.5s' }}>
                <Star className="text-orange" size={24} fill="currentColor" />
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={0.1}>
            <Kicker>Our Milestone</Kicker>
            <h2 id="anniversary-title" className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-[-0.5px] text-navy mt-4 mb-6">
              {renderHeading(heading)}
            </h2>
            <p className="text-lg text-body-gray leading-relaxed max-w-xl mb-10">{description}</p>

            {/* Milestone Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={index} className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-orange/20 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center">
                        <Icon size={20} className="text-orange" />
                      </div>
                      <span className="text-2xl font-extrabold text-navy">{milestone.value}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-600">{milestone.label}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Yrs25;
