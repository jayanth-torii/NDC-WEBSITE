import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const Objectives = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, any> =
    (departmentJson["objectives"] as any)?.data || {};

  const content = useMemo(() => {
    let matchedData: any = null;
    Object.keys(apiData).forEach((k) => {
      if (normalizeKey(k) === normalizedProgramme) {
        matchedData = apiData[k];
      }
    });
    return matchedData;
  }, [apiData, normalizedProgramme]);

  useEffect(() => {
    haveContentCheck(content != null);
  }, [content, haveContentCheck]);

  if (!content) return null;

  const { title, points } = content;

  return (
    <Reveal>
      <div className="space-y-6 md:space-y-8 max-w-4xl">
        <header className="pb-4 border-b border-navy/10">
          <h1 className="text-2xl md:text-3xl text-navy font-extrabold tracking-tight">
            {title || "Objectives"}
          </h1>
        </header>

        <ul className="space-y-4">
          {points?.map((point: string, idx: number) => (
            <li key={idx} className="flex gap-4 items-start group">
              <span className="w-8 h-8 rounded-full bg-orange/10 text-orange flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange group-hover:text-white transition-colors duration-300 shadow-sm border border-orange/20 font-bold text-sm">
                {idx + 1}
              </span>
              <p className="text-[15px] md:text-base text-[#5f6368] leading-relaxed pt-1">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
};

export default Objectives;
