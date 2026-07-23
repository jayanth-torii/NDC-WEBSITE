"use client";
import React from "react";
import { Reveal } from "@/components/ui/Reveal";

const IconChronicles = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
    <path d="m12 3 9 5H3l9-5Z" />
    <path d="M5 11v7M9.5 11v7M14.5 11v7M19 11v7" />
    <path d="M3 21h18" />
  </svg>
);
const IconResearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
    <path d="M9 3h6M10 3v6l-5 8.5A2 2 0 0 0 6.8 21h10.4a2 2 0 0 0 1.8-3.5L14 9V3" />
    <path d="M7.5 15h9" />
  </svg>
);
const IconSpotlight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
    <path d="m12 3 2.6 5.3 5.9.86-4.27 4.16 1 5.88L12 16.9l-5.23 2.3 1-5.88L2.5 9.16l5.9-.86z" />
  </svg>
);
const IconFaculty = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
    <path d="M3 4h18" />
    <path d="M4 4v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4" />
    <path d="M12 15v6M9 21h6" />
    <path d="m8 11 2.5-2.6 2 2L16 7" />
  </svg>
);

const SamashtiFeatures = () => {
  const features = [
    {
      icon: <IconChronicles />,
      title: "Campus Chronicles",
      desc: "Moments and milestones from across departments."
    },
    {
      icon: <IconResearch />,
      title: "Research Horizons",
      desc: "Deep-dives into cutting-edge research and innovation."
    },
    {
      icon: <IconSpotlight />,
      title: "Student Spotlight",
      desc: "Achievements, projects and voices that lead change."
    },
    {
      icon: <IconFaculty />,
      title: "Faculty Insights",
      desc: "Expert perspectives shaping education and industry."
    }
  ];

  return (
    <section className="bg-white pt-[46px] pb-[54px]">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[22px] p-[28px_34px] bg-gradient-to-br from-[#0e2455] to-[#0a1a3f] shadow-[0_24px_54px_rgba(14,36,85,0.2)]">
            <h3 className="text-white text-[20px] font-extrabold mb-[20px]">What you'll discover</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {features.map((item, idx) => (
                <div key={idx} className={`flex items-start gap-[13px] p-[4px_24px] ${idx === 0 ? 'pl-0' : 'border-l border-white/10 max-lg:border-l-0 max-lg:border-t max-lg:pt-[20px] max-lg:mt-[16px]'}`}>
                  <div className="shrink-0 w-[42px] h-[42px] rounded-[12px] bg-[#f6872a29] text-[#ffb978] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-extrabold text-[14.5px] mb-[5px]">{item.title}</h4>
                    <p className="text-[#c7d0e0] text-[12.5px] leading-[1.5] m-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SamashtiFeatures;
