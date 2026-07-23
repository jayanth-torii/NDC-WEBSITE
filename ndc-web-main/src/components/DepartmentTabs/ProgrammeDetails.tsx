"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

interface Section {
  title?: string;
  points: string[];
}

interface CourseItem {
  label: string;
  value?: string;
  sections?: Section[];
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const ProgrammeDetails = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, CourseItem[]> =
    (departmentJson["programme-details"] as any)?.data || {};

  const normalizedMap = useMemo(() => {
    const map: Record<string, CourseItem[]> = {};
    Object.entries(apiData || {}).forEach(([key, value]) => {
      map[normalizeKey(key)] = value as CourseItem[];
    });
    return map;
  }, [apiData]);

  const courseData = useMemo<CourseItem[] | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!courseData) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No data found for this department: <strong>{programme}</strong>
      </p>
    );
  }

  return (
    <Reveal>
      <div>
        <header className="pb-6 mb-2 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Curriculum
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            PROGRAMME DETAILS
          </h2>
        </header>

        <dl className="divide-y divide-navy/10 border-b border-navy/10">
          {courseData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 group hover:bg-surface-light/60 transition-colors duration-300 -mx-2 px-2"
            >
              <dt className="md:col-span-4 flex items-start gap-3">
                <span className="text-orange text-[11px] font-bold tracking-[0.14em] tabular-nums pt-1 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-bold text-navy tracking-tight">
                  {item.label}
                </span>
              </dt>
              <dd className="md:col-span-8 text-body-gray">
                {item?.value && <p className="leading-relaxed">{item?.value}</p>}
                {item?.sections?.map((section, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    {section?.title && (
                      <p className="font-semibold text-navy mb-2">
                        {section?.title}
                      </p>
                    )}
                    <ul className="space-y-2">
                      {section?.points?.map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-orange" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
};

export default ProgrammeDetails;
