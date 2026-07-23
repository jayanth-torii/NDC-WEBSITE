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
      <div className="space-y-12">
        <header className="pb-6 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Overview
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight text-balance">
            {departmentData?.title || "About Department"}
          </h1>
        </header>

        {Array.isArray(departmentData?.sections) &&
          departmentData.sections.length > 0 && (
            <RevealGroup className="space-y-0">
              {departmentData.sections.map((section: any, idx: number) => (
                <RevealItem key={idx}>
                  <article className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-8 py-8 border-b border-navy/10 last:border-b-0">
                    <span className="text-orange font-extrabold text-sm tracking-[0.16em] tabular-nums pt-1">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-navy mb-5 tracking-tight">
                        {section?.title}
                      </h2>
                      <div className="space-y-4">
                        {section?.points?.map((pt: string, j: number) => (
                          <div className="flex items-start gap-4" key={j}>
                            <span className="mt-2.5 w-1.5 h-1.5 shrink-0 bg-orange" />
                            <p className="leading-relaxed text-body-gray text-base md:text-lg max-w-prose">
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          )}

        <div className="grid grid-cols-1 md:grid-cols-2 border border-navy/10">
          {departmentData?.vision?.length > 0 && (
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-navy/10 bg-surface-light/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 flex items-center justify-center bg-orange/10 text-orange">
                  <Eye size={22} />
                </div>
                <h2 className="text-2xl font-extrabold text-navy tracking-tight">
                  Vision
                </h2>
              </div>
              <ul className="space-y-4">
                {departmentData.vision.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-orange" />
                    <span className="text-body-gray leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {departmentData?.mission?.length > 0 && (
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 flex items-center justify-center bg-navy/10 text-navy">
                  <Target size={22} />
                </div>
                <h2 className="text-2xl font-extrabold text-navy tracking-tight">
                  Mission
                </h2>
              </div>
              <ul className="space-y-4">
                {departmentData.mission.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-navy" />
                    <span className="text-body-gray leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default AboutCourse;
