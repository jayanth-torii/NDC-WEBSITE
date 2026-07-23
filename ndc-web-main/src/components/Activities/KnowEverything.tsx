"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight, Shield, Users, BookOpen, Award, Leaf, Scale, HeartHandshake, Target, Lightbulb, Compass, Flag } from "lucide-react";
import StudentCenterContent from "@/app/Data/StudentCenterContent";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

type Tab =
  | "Student Oriented Cells"
  | "Faculty Oriented Cells"
  | "Academic & Social Engagement Forums";

const CHILD_TO_TAB: Record<string, Tab> = {
  "anti-ragging-cell": "Student Oriented Cells",
  "women-cell": "Student Oriented Cells",
  "students-grievance-cell": "Student Oriented Cells",
  "anti-sexual-harassment-cell": "Student Oriented Cells",
  "equal-opportunity-cell": "Student Oriented Cells",
  "eco-clubs": "Student Oriented Cells",
  "faculties-welfare": "Faculty Oriented Cells",
  "sc-st-obc-minority-cell": "Faculty Oriented Cells",
  "faculty-study-circle": "Faculty Oriented Cells",
  "ed-cell": "Faculty Oriented Cells",
  "icc-cell": "Faculty Oriented Cells",
  "ncc-cell": "Academic & Social Engagement Forums",
  "nss-cell": "Academic & Social Engagement Forums",
  "commerce-and-management-forum": "Academic & Social Engagement Forums",
  "ambedkar-study-circle": "Academic & Social Engagement Forums",
  "industrial-visit": "Academic & Social Engagement Forums",
};

const parentSlugToTab: Record<string, Tab> = {
  "student-oriented-cells": "Student Oriented Cells",
  "faculty-oriented-cells": "Faculty Oriented Cells",
  "academic-and-social-engagement-forums": "Academic & Social Engagement Forums",
};

const ICONS = [Shield, Users, BookOpen, Award, Leaf, Scale, HeartHandshake, Target, Lightbulb, Compass, Flag];

const KnowEverything = ({ data }: any) => {
  const { title, description, image } = data ?? {};
  const router = useRouter();
  const pathname = usePathname();

  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);

  useEffect(() => {
    const rawHash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const hash = decodeURIComponent(rawHash);

    if (StudentCenterContent.tabsList.includes(hash as Tab)) {
      setSelectedTab(hash as Tab);
      return;
    }

    const segments = pathname.split("/").filter(Boolean);
    for (const seg of segments) {
      if (parentSlugToTab[seg]) {
        setSelectedTab(parentSlugToTab[seg]);
        return;
      }
    }
    for (const seg of segments) {
      if (CHILD_TO_TAB[seg]) {
        setSelectedTab(CHILD_TO_TAB[seg]);
        return;
      }
    }

    setSelectedTab("Student Oriented Cells");
  }, [pathname]);

  useEffect(() => {
    if (!selectedTab) return;
    const desired = `#${selectedTab}`;
    if (typeof window !== "undefined" && window.location.hash !== desired) {
      window.location.hash = selectedTab;
    }
  }, [selectedTab]);

  const handleProgrammeClick = (programmePath: string) => {
    if (!selectedTab) return;
    const tabPath = selectedTab.toLowerCase().replace(/\s+/g, "-");
    router.push(`/activities/${tabPath}/${programmePath}`);
  };

  const currentProgrammes = selectedTab ? StudentCenterContent.programmeOptions[selectedTab] : [];

  return (
    <div className="mb-24 md:mb-32 relative">
      <header className="mb-10 text-center flex flex-col items-center">
        <SectionHeading title={title ?? StudentCenterContent.title} className="mb-2" />
        <p className="text-body-gray text-[17px] max-w-2xl text-center mt-4">
          Discover the various cells, forums, and committees that make our campus vibrant and supportive.
        </p>
      </header>

      {/* Floating Segmented Tabs */}
      <div className="flex justify-center mb-12 md:mb-16 relative z-20">
        <div className="inline-flex overflow-x-auto p-1.5 bg-surface-tint border border-card-border rounded-full shadow-sm max-w-[95vw] md:max-w-full no-scrollbar">
          {StudentCenterContent.tabsList.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab as Tab)}
              className={`whitespace-nowrap px-6 md:px-8 py-3.5 rounded-full font-bold text-[14px] md:text-[15px] transition-all duration-500 ease-[var(--ease-editorial)] ${
                selectedTab === tab
                  ? "bg-white text-navy shadow-[0_8px_20px_rgba(14,36,85,0.08)] scale-100"
                  : "bg-transparent text-body-gray hover:text-navy hover:bg-white/50 scale-95 hover:scale-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Premium Bento Box Layout */}
      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
        
        {/* Main Hero Card (Spans 2x2 on large screens) */}
        <RevealItem className="md:col-span-2 lg:col-span-2 xl:col-span-2 md:row-span-2 rounded-[32px] overflow-hidden group min-h-[450px] flex flex-col justify-end border border-card-border shadow-[var(--shadow-card)] relative">
          <Image
            src={image ?? StudentCenterContent.imageSrc}
            alt={selectedTab || "Activities"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover transition-transform duration-[2000ms] ease-[var(--ease-editorial)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent"></div>
          
          <div className="relative z-10 p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-[1.1] tracking-tight drop-shadow-md">
              {selectedTab}
            </h2>
            <div className="w-12 h-1 bg-orange rounded-full mb-6"></div>
            <p className="text-white/90 text-[16px] md:text-[18px] font-medium leading-relaxed drop-shadow-sm max-w-lg">
              {description ?? StudentCenterContent.description}
            </p>
          </div>
        </RevealItem>

        {/* Programme Bento Cards */}
        {currentProgrammes.map((prog: any, i: number) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <RevealItem 
              key={i} 
              className="col-span-1"
            >
              <div 
                onClick={() => handleProgrammeClick(prog.path)}
                className="bg-white rounded-[32px] p-8 border border-card-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-orange/30 transition-all duration-500 cursor-pointer flex flex-col justify-between group relative overflow-hidden h-full min-h-[240px]"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full blur-3xl group-hover:bg-orange/15 transition-colors duration-500 -mr-10 -mt-10 pointer-events-none"></div>
                
                <div className="w-14 h-14 rounded-full bg-surface-tint flex items-center justify-center text-navy mb-8 group-hover:-translate-y-1 group-hover:bg-orange group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                
                <div className="relative z-10 mb-6">
                  <h3 className="text-[20px] md:text-[22px] font-bold text-navy leading-[1.3] group-hover:text-orange transition-colors duration-300">
                    {prog.name}
                  </h3>
                </div>
                
                {/* Arrow Button */}
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-surface-tint border border-card-border flex items-center justify-center text-navy opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 group-hover:bg-navy group-hover:text-white group-hover:border-navy shadow-lg">
                  <ArrowRight size={20} />
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
};

export default KnowEverything;
