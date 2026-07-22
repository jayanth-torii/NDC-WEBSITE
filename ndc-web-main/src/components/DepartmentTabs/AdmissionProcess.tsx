"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import Card from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface Section {
  title: string;
  description?: string;
  points?: string[];
}

interface AdmissionData {
  title: string;
  sections: Section[];
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const AdmissionProcess = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, AdmissionData> = (departmentJson["admission-processes"] as any)?.data || {};

  // ✅ Normalize keys once, before any conditional returns
  const normalizedMap = useMemo(() => {
    const map: Record<string, AdmissionData> = {};
    Object.keys(apiData || {}).forEach((k) => {
      map[normalizeKey(k)] = apiData[k];
    });
    return map;
  }, [apiData]);

  const departmentData = useMemo<AdmissionData | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  // ✅ Tell parent if the programme key exists in the response (true/false)
  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  // ---- UI returns after all hooks ----
  if (!departmentData || !Array.isArray(departmentData.sections)) {
    return (
      <div className="text-center py-10 text-red-500">
        No admission process data found for: {programme}
      </div>
    );
  }

  return (
    <Reveal>
      <div className="text-body-gray p-4 space-y-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.5px] mb-2">{departmentData?.title}</h1>
        <RevealGroup className="space-y-6">
          {departmentData?.sections.map((section, idx) => (
            <RevealItem key={idx}>
              <Card accent="orange-left" className="p-5 md:p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-navy mb-3">{section.title}</h2>

                {section?.description && (
                  <p className="text-base leading-relaxed whitespace-pre-line mb-2 text-body-gray">
                    {section?.description}
                  </p>
                )}

                {Array.isArray(section?.points) && section?.points?.length > 0 && (
                  <ul className="list-disc pl-6 space-y-1 marker:text-orange">
                    {section?.points?.map((point, i) => (
                      <li key={i} className="text-base text-justify text-body-gray">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Reveal>
  );
};

export default AdmissionProcess;
