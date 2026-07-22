"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

// Interfaces for type safety
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

  const apiData: Record<string, CourseItem[]> = (departmentJson["programme-details"] as any)?.data || {};

  // ✅ Normalize keys once (before any conditional returns)
  const normalizedMap = useMemo(() => {
    const map: Record<string, CourseItem[]> = {};
    Object.entries(apiData || {}).forEach(([key, value]) => {
      map[normalizeKey(key)] = value as CourseItem[];
    });
    return map;
  }, [apiData]);

  // ✅ Pick course data for selected programme
  const courseData = useMemo<CourseItem[] | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  // ✅ Inform parent whether the programme key exists in API response
  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  // ---- UI returns after all hooks ----
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.5px] mb-5">
          PROGRAMME DETAILS
        </h2>
        <div className="overflow-x-auto rounded-[14px] border border-card-border">
          <table className="min-w-full">
            <tbody className="bg-white text-body-gray">
              {courseData.map((item, index) => (
                <tr key={index} className="border-t border-card-border first:border-t-0 align-top">
                  <td className="px-6 py-4 font-semibold text-navy border-r border-card-border w-1/3 bg-surface-tint">
                    {item.label}
                  </td>
                  <td className="px-6 py-4 w-2/3">
                    {item?.value && <p>{item?.value}</p>}
                    {item?.sections?.map((section, i) => (
                      <div key={i} className="mb-3">
                        {section?.title && (
                          <p className="font-semibold text-navy mb-1">
                            {section?.title}
                          </p>
                        )}
                        <ul className="list-disc list-outside ml-4 marker:text-orange">
                          {section?.points?.map((point, j) => (
                            <li className="text-justify text-base" key={j}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
};

export default ProgrammeDetails;
