"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

interface ResearchData {
  title?: string;
  points?: string[];
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const Research = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, ResearchData> =
    (departmentJson["department-researches"] as any)?.data || {};

  const normalizedMap = useMemo(() => {
    const map: Record<string, ResearchData> = {};
    Object.keys(apiData || {}).forEach((k) => {
      map[normalizeKey(k)] = apiData[k];
    });
    return map;
  }, [apiData]);

  const data = useMemo<ResearchData | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!data) {
    return (
      <p className="text-center text-red-500 mt-4">
        No Research data available.
      </p>
    );
  }

  const points = Array.isArray(data.points) ? data.points : [];

  return (
    <Reveal>
      <div>
        <header className="pb-6 mb-2 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Scholarship
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            {data?.title}
          </h2>
        </header>

        <div className="max-h-[420px] md:max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
          {points.length > 0 ? (
            <ol className="relative border-l-2 border-navy/10 ml-2">
              {points.map((item, idx) => (
                <li key={idx} className="relative pl-8 py-4 group">
                  <span className="absolute left-0 top-6 -translate-x-[calc(50%+1px)] w-2.5 h-2.5 bg-white border-2 border-orange group-hover:bg-orange transition-colors duration-300" />
                  <div className="flex gap-4 items-start">
                    <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums pt-0.5 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-body-gray leading-relaxed group-hover:text-navy transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-body-gray py-8">No research points available.</p>
          )}
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: var(--color-orange);
          }
        `}</style>
      </div>
    </Reveal>
  );
};

export default Research;
