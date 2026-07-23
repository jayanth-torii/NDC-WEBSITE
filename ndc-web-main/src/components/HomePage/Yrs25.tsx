"use client";
import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import Kicker from "@/components/ui/Kicker";

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

  return (
    <section className="relative overflow-hidden bg-surface-tint py-20 lg:py-28" aria-labelledby="anniversary-title">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" aria-hidden="true" />
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-orange-200/25 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 -right-24 w-[340px] h-[340px] rounded-full bg-navy/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal className="flex justify-center order-2 lg:order-1">
            <div className="group relative w-full max-w-[360px] aspect-square flex items-center justify-center">
              <span className="absolute inset-[-4%] rounded-[34px] bg-gradient-to-br from-navy to-navy-dark rotate-[-9deg] shadow-[var(--shadow-navy)] transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:rotate-0" />
              <span className="absolute w-[91%] h-[91%] rounded-full border-[3px] border-white/80" />
              <div className="relative w-[84%] aspect-square rounded-full overflow-hidden shadow-[0_26px_52px_rgba(14,36,85,0.32)] animate-float">
                <img src={imageSrc} alt={heading} loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute inset-0 rounded-full shadow-[inset_0_0_0_2px_rgba(255,255,255,0.25),inset_0_12px_30px_rgba(255,255,255,0.12)]" />
              </div>

              <div className="absolute -bottom-3 -left-3 md:-left-8 bg-white px-5 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange font-extrabold text-sm">
                  25
                </div>
                <span className="text-navy font-bold text-sm leading-tight">
                  Years of<br />Milestones
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={0.1}>
            <Kicker>Our Milestone</Kicker>
            <h2 id="anniversary-title" className="text-3xl md:text-[2.6rem] font-extrabold leading-[1.15] tracking-[-0.5px] text-navy mt-3 mb-6">
              {renderHeading(heading)}
            </h2>
            <p className="text-lg text-body-gray leading-relaxed max-w-xl">{description}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Yrs25;
