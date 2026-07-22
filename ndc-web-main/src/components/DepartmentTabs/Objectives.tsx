"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import Card from "@/components/ui/Card";
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

  const apiData: Record<string, ObjectiveType> = (departmentJson["objectives"] as any)?.data || {};

  // ✅ normalize keys once
  const normalizedMap = useMemo(() => {
    const map: Record<string, ObjectiveType> = {};
    Object.keys(apiData).forEach((key) => {
      map[normalizeKey(key)] = apiData[key];
    });
    return map;
  }, [apiData]);

  const data = normalizedMap[normalizedProgramme];

  // ✅ notify parent whether programme key exists in response
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
      <div className="px-0 md:px-6 mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.5px] mb-5">{data.title}</h2>
        <Card accent="orange-left" className="p-5 md:p-6">
          <ol className="list-decimal list-inside space-y-2 text-body-gray text-base marker:text-orange marker:font-semibold">
            {data.points.map((point, index) => (
              <li key={index} className="leading-relaxed text-justify">
                {point}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </Reveal>
  );
};

export default Objectives;
