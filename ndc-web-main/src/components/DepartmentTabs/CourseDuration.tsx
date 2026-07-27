import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Clock } from "lucide-react";
import { useLiveData } from "@/hooks/useLiveData";
import { getDepartmentTab } from "@/services/data.service";

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const CourseDuration = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const { data: apiData } = useLiveData(() => getDepartmentTab("/department/course-duration"));

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
            {title || "Course Duration"}
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections?.map((section: any, idx: number) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4 border-b border-gray-50 pb-4">
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                  <Clock size={20} />
                </div>
                <h3 className="text-lg font-bold text-navy">
                  {section.title || `Details`}
                </h3>
              </div>
              
              {section.description && (
                <p className="text-[15px] text-[#5f6368] leading-relaxed mb-4">
                  {section.description}
                </p>
              )}
              
              {section.points && section.points.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {section.points.map((point: string, pIdx: number) => (
                    <li key={pIdx} className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0"></span>
                      <span className="text-[14.5px] text-[#5f6368] leading-relaxed">
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

export default CourseDuration;
