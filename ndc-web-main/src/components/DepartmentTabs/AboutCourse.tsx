"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, Target } from "lucide-react";
import departmentJson from "@/data-export/department/data.json";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const AboutCourse = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: any = (departmentJson["about-departments"] as any)?.data || {};

  const normalizedMap = useMemo(() => {
    if (!apiData) return {};
    const m: Record<string, any> = {};
    Object.keys(apiData).forEach((k) => {
      m[normalizeKey(k)] = apiData[k];
    });
    return m;
  }, [apiData]);

  const departmentData = useMemo(
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
        No department data available.
      </p>
    );
  }

  if (!departmentData) {
    return (
      <p className="text-center text-red-500 mt-4">
        No department data found for: {programme}
      </p>
    );
  }

  return (
    <Reveal>
      <div className="space-y-6">
        {/* Compact Header */}
        <div className="border-l-4 border-orange pl-4 py-1 mb-6">
          <p className="text-orange text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
            Overview
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight uppercase">
            {departmentData?.title || "About Department"}
          </h1>
        </div>

        {(normalizedProgramme === "mba" || normalizedProgramme === "mca") ? (
          /* MBA/MCA Specific Layout */
          <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 max-w-4xl">
            {departmentData?.sections?.map((section: any, idx: number) => (
              <div key={idx} className="mb-6 last:mb-0">
                <div className="inline-flex items-center justify-center bg-orange/10 text-orange font-bold text-sm px-3 py-1.5 rounded mb-4">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                {section?.title && (
                  <h2 className="text-lg font-bold text-navy mb-4">
                    {section.title}
                  </h2>
                )}
                <div className="space-y-4">
                  {section?.points?.map((pt: string, j: number) => (
                    <div className="flex items-start gap-3" key={j}>
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-orange/80" />
                      <p className="leading-relaxed text-[#5f6368] text-[15px] font-medium">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Standard Compact Layout for other programmes */
          <>
            {/* Compact Grid for Sections */}
            {Array.isArray(departmentData?.sections) &&
              departmentData.sections.length > 0 && (
                <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departmentData.sections.map((section: any, idx: number) => (
                    <RevealItem key={idx}>
                      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5 h-full transition-transform hover:-translate-y-0.5 duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-orange font-black text-sm tracking-widest bg-orange/10 px-2 py-0.5 rounded text-center min-w-[28px]">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-base font-bold text-navy tracking-tight uppercase leading-tight">
                            {section?.title}
                          </h2>
                        </div>
                        <div className="space-y-2">
                          {section?.points?.map((pt: string, j: number) => (
                            <div className="flex items-start gap-2.5" key={j}>
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-orange/80" />
                              <p className="leading-snug text-[#5f6368] text-[13px] font-medium">
                                {pt}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}

            {/* Compact Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {departmentData?.vision?.length > 0 && (
                <div className="bg-navy rounded-xl shadow-sm p-6 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl transition-transform duration-500 group-hover:scale-150" />
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm">
                      <Eye size={16} />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Vision
                    </h2>
                  </div>
                  <ul className="space-y-2 relative z-10">
                    {departmentData.vision.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-orange" />
                        <span className="text-white/90 leading-snug text-[13px] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {departmentData?.mission?.length > 0 && (
                <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange/5 rounded-full blur-xl transition-transform duration-500 group-hover:scale-150" />
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange/10 text-orange">
                      <Target size={16} />
                    </div>
                    <h2 className="text-xl font-bold text-navy tracking-tight">
                      Mission
                    </h2>
                  </div>
                  <ul className="space-y-2 relative z-10">
                    {departmentData.mission.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-navy" />
                        <span className="text-[#5f6368] leading-snug text-[13px] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Reveal>
  );
};

export default AboutCourse;
