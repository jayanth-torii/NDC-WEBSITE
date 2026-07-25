import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle2 } from "lucide-react";

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const AdmissionProcess = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, any> =
    (departmentJson["admission-processes"] as any)?.data || {};

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

  const { title, sections } = content;

  return (
    <Reveal>
      <div className="space-y-8 max-w-4xl">
        <header className="pb-4 border-b border-navy/10">
          <h1 className="text-2xl md:text-3xl text-navy font-extrabold tracking-tight">
            {title || "Admission Process"}
          </h1>
        </header>

        <div className="space-y-8">
          {sections?.map((section: any, idx: number) => (
            <div key={idx} className="bg-gray-50/50 rounded-2xl p-6 md:p-8 border border-navy/5">
              {section.title && (
                <h3 className="text-xl font-bold text-navy mb-4">
                  {section.title}
                </h3>
              )}
              {section.description && (
                <p className="text-[15px] md:text-base text-[#5f6368] leading-relaxed mb-4">
                  {section.description}
                </p>
              )}
              {section.points && section.points.length > 0 && (
                <ul className="space-y-3">
                  {section.points.map((point: string, pIdx: number) => (
                    <li key={pIdx} className="flex gap-3 items-start">
                      <CheckCircle2 size={18} className="text-orange shrink-0 mt-1" />
                      <span className="text-[15px] text-[#5f6368] leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default AdmissionProcess;
