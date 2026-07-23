"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

type ObjectiveType = {
  title: string;
  points: string[];
};

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const Objectives = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, ObjectiveType> =
    (departmentJson["objectives"] as any)?.data || {};

  const normalizedMap = useMemo(() => {
    const map: Record<string, ObjectiveType> = {};
    Object.keys(apiData).forEach((key) => {
      map[normalizeKey(key)] = apiData[key];
    });
    return map;
  }, [apiData]);

  const data = normalizedMap[normalizedProgramme];

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!data) {
    return (
      <p className="text-center text-red-500 mt-4">
        No objectives data found for: {programme}
      </p>
    );
  }

  return (
    <Reveal>
      <div>
        <header className="pb-6 mb-2 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Goals
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            {data.title}
          </h2>
        </header>

        <ol className="relative border-l-2 border-navy/10 ml-2 space-y-0">
          {data.points.map((point, index) => (
            <li key={index} className="relative pl-8 py-5">
              <span className="absolute left-0 top-7 -translate-x-[calc(50%+1px)] w-3 h-3 bg-white border-2 border-orange" />
              <div className="flex gap-4 items-start">
                <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums pt-1 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-body-gray leading-relaxed">{point}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
};

export default Objectives;
