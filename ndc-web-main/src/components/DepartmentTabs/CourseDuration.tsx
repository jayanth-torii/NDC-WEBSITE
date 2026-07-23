"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface Section {
  title: string;
  description?: string;
  points?: string[];
}

interface CourseData {
  title: string;
  sections: Section[];
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const CourseDuration = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, CourseData> =
    (departmentJson["course-durations"] as any)?.data || {};

  const normalizedMap = useMemo(() => {
    const map: Record<string, CourseData> = {};
    Object.keys(apiData || {}).forEach((k) => {
      map[normalizeKey(k)] = apiData[k];
    });
    return map;
  }, [apiData]);

  const departmentData = useMemo<CourseData | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!departmentData || !Array.isArray(departmentData.sections)) {
    return (
      <div className="text-center text-red-500 mt-4">
        No course duration data found for: {programme}
      </div>
    );
  }

  return (
    <Reveal>
      <div>
        <header className="pb-6 mb-2 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Timeline
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            {departmentData?.title}
          </h1>
        </header>

        <RevealGroup>
          {departmentData?.sections?.map((section, idx) => (
            <RevealItem key={idx}>
              <article className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-8 py-8 border-b border-navy/10 last:border-b-0">
                <span className="text-orange font-extrabold text-sm tracking-[0.16em] tabular-nums pt-1">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-navy mb-3 tracking-tight">
                    {section?.title}
                  </h2>

                  {section?.description && (
                    <p className="leading-relaxed mb-4 whitespace-pre-line text-body-gray max-w-prose">
                      {section?.description}
                    </p>
                  )}

                  {Array.isArray(section?.points) &&
                    section?.points?.length > 0 && (
                      <ol className="space-y-2">
                        {section?.points?.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-orange text-[11px] font-bold tracking-[0.14em] tabular-nums pt-1 shrink-0">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-body-gray leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ol>
                    )}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Reveal>
  );
};

export default CourseDuration;
