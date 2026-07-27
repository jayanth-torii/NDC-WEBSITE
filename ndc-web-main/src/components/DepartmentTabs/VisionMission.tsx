"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Text } from "@mantine/core";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useLiveData } from "@/hooks/useLiveData";
import { getDepartmentTab } from "@/services/data.service";

interface Section {
  title?: string;
  description?: string;
  points?: string[];
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

export default function VisionMission({ haveContentCheck }: any) {
  const { data: apiData } = useLiveData(() => getDepartmentTab("/department/vision-mission"));

  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const normalizedMap: Record<string, Section[]> = useMemo(() => {
    if (!apiData) return {};
    const map: Record<string, Section[]> = {};
    Object.entries(apiData).forEach(([key, value]) => {
      map[normalizeKey(key)] = (value as any)?.sections || [];
    });
    return map;
  }, [apiData]);

  const content = useMemo(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!apiData) {
    return (
      <p className="text-center text-red-500 mt-4">
        No vision & mission data available.
      </p>
    );
  }

  if (!content || content.length === 0) {
    return (
      <Text className="text-red-500 text-center">Programme content not found.</Text>
    );
  }

  return (
    <Reveal>
      <div className="space-y-0">
        <header className="pb-6 mb-2 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Direction
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            Vision & Mission
          </h1>
        </header>

        <RevealGroup className={`grid grid-cols-1 md:grid-cols-2 ${normalizedProgramme === "mca" ? "gap-4" : "gap-6"}`}>
          {content.map((section, index) => {
            const isVision = section.title?.toLowerCase().includes("vision");
            const bgLetter = isVision ? "V" : "M";
            
            return (
              <RevealItem key={index}>
                <div className={`bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden h-full group transition-all duration-300 hover:-translate-y-1 border border-gray-100 ${normalizedProgramme === "mca" ? "p-6 md:p-8" : "p-8 md:p-10"}`}>
                  
                  {/* Large Faded Background Letter */}
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-300 pointer-events-none text-navy text-8xl md:text-9xl font-black italic leading-none">
                    {bgLetter}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange/10 text-orange shadow-inner">
                        <span className="font-black text-xl tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {section.title && (
                        <h3 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
                          {section.title}
                        </h3>
                      )}
                    </div>
                    
                    {section.description && (
                      <p className={`mb-4 text-[#5f6368] text-[15px] font-medium ${normalizedProgramme === "mca" ? "leading-snug" : "leading-[1.8]"}`}>
                        {section.description}
                      </p>
                    )}
                    
                    {Array.isArray(section?.points) && section.points.length > 0 && (
                      <ul className={normalizedProgramme === "mca" ? "space-y-2.5" : "space-y-4"}>
                        {section.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <span className={`${normalizedProgramme === "mca" ? "mt-1.5" : "mt-2.5"} w-2 h-2 rounded-full shrink-0 bg-orange/60 shadow-[0_0_8px_rgba(246,135,42,0.3)]`} />
                            <span className={`text-[#5f6368] text-[15px] font-medium ${normalizedProgramme === "mca" ? "leading-snug" : "leading-[1.8]"}`}>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Reveal>
  );
}
