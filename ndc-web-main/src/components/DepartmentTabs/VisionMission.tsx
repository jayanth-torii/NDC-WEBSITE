"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Text } from "@mantine/core";
import departmentJson from "@/data-export/department/data.json";

interface Section {
  title?: string;
  description?: string;
  points?: string[];
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

export default function VisionMission({ haveContentCheck }: any) {
  const apiData: any = (departmentJson["vision-missions"] as any)?.data || {};

  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  // ✅ Build a normalized map once (hook runs before any returns)
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

  // ✅ Notify parent if the programme key exists in response (true/false)
  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  // ---- UI returns after all hooks ----
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
    <div className="bg-white mb-10 md:mb-20 px-4 space-y-8">
      {/* <h2 className="text-3xl font-bold text-[#003333] mb-4">VISION & MISSION</h2> */}

      {content.map((section, index) => (
        <div key={index}>
          {section.title && (
            <h3 className="text-2xl font-semibold text-[#0E2455] mb-2">
              {section.title}
            </h3>
          )}

          {section.description && (
            <p className="text-justify mb-4 text-[#003333]">
              {section.description}
            </p>
          )}
            {Array.isArray(section?.points) && section.points.length > 0 && (
            <ul className="list-disc ml-6 space-y-2">
                {section.points.map((point, i) => (
                <li key={i} className="text-justify text-[#003333]">
                    {point}
                </li>
                ))}
            </ul>
            )}
        </div>
      ))}
    </div>
  );
}
