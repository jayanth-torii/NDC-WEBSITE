"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Text } from "@mantine/core";
import departmentJson from "@/data-export/department/data.json";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

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

        <RevealGroup>
          {content.map((section, index) => (
            <RevealItem key={index}>
              <article className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 md:gap-8 py-8 border-b border-navy/10 last:border-b-0">
                <span className="text-orange font-extrabold text-sm tracking-[0.16em] tabular-nums pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  {section.title && (
                    <h3 className="text-2xl font-bold text-navy mb-3 tracking-tight">
                      {section.title}
                    </h3>
                  )}
                  {section.description && (
                    <p className="mb-5 text-body-gray leading-relaxed max-w-prose">
                      {section.description}
                    </p>
                  )}
                  {Array.isArray(section?.points) && section.points.length > 0 && (
                    <ul className="space-y-3">
                      {section.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-orange" />
                          <span className="text-body-gray leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Reveal>
  );
}
