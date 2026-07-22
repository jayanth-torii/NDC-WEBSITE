"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import Card from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

// Normalize any key (e.g., "B.Com" => "bcom", "Bcom_BDA" => "bcombda")
const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const AboutCourse = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: any = (departmentJson["about-departments"] as any)?.data || {};

  // ✅ Always run hooks before any returns
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
    // true if the key exists in the response, even if it's an empty object
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);


  // ---- UI returns can come after all hooks ----
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
      <div className="md:px-6 space-y-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.5px]">
          {departmentData?.title || "About Department"}
        </h1>

        {/* Sections */}
        {Array.isArray(departmentData?.sections) && departmentData.sections.length > 0 && (
          <RevealGroup className="space-y-6">
            {departmentData.sections.map((section: any, idx: number) => (
              <RevealItem key={idx}>
                <Card accent="orange-left" className="p-5 md:p-6">
                  <h2 className="text-xl font-semibold text-navy mb-3">
                    {section?.title}
                  </h2>
                  <ul className="list-disc ml-5 space-y-2 text-body-gray marker:text-orange">
                    {section?.points?.map((pt: string, j: number) => (
                      <li className="text-justify leading-relaxed" key={j}>{pt}</li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        {/* Vision */}
        {departmentData?.vision?.length > 0 && (
          <Card accent="orange-left" className="p-5 md:p-6">
            <h2 className="text-xl font-semibold text-orange mb-3">Vision</h2>
            <ul className="list-disc ml-5 space-y-2 text-body-gray marker:text-orange">
              {departmentData.vision.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Card>
        )}

        {/* Mission */}
        {departmentData?.mission?.length > 0 && (
          <Card accent="orange-left" className="p-5 md:p-6">
            <h2 className="text-xl font-semibold text-orange mb-3">Mission</h2>
            <ul className="list-disc ml-5 space-y-2 text-body-gray marker:text-orange">
              {departmentData.mission.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </Reveal>
  );
};

export default AboutCourse;
