import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const SyllabusDetails = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, any> =
    (departmentJson["syllabus-details"] as any)?.data || {};

  const content = useMemo(() => {
    let matchedData = null;
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

  const [activeSem, setActiveSem] = useState(0);

  if (!content) return null;

  const { title, SyllabusSection } = content;
  const sections = Array.isArray(SyllabusSection) ? SyllabusSection : [];

  return (
    <Reveal>
      <div className="space-y-8">
        <header className="pb-4 border-b border-navy/10">
          <h1 className="text-2xl md:text-3xl text-navy font-extrabold tracking-tight">
            {title || "Syllabus Details"}
          </h1>
        </header>

        {sections.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Semester Navigation */}
            <div className="w-full lg:w-1/4 shrink-0">
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                {sections.map((sem: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSem(idx)}
                    className={`whitespace-nowrap lg:whitespace-normal text-left px-5 py-3.5 rounded-xl font-bold text-[14.5px] transition-all duration-300 ${
                      activeSem === idx
                        ? "bg-navy text-white shadow-md border-l-4 border-orange"
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-navy border-l-4 border-transparent"
                    }`}
                  >
                    {sem.tabName}
                  </button>
                ))}
              </div>
            </div>

            {/* Syllabus Content */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-extrabold text-navy mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange"></span>
                    {sections[activeSem]?.tabName} Curriculum
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-navy font-bold text-[13px] uppercase tracking-wider">
                          <th className="py-4 px-5 rounded-tl-xl border-b border-gray-100">Category</th>
                          <th className="py-4 px-5 rounded-tr-xl border-b border-gray-100">Course / Subject</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {sections[activeSem]?.rows?.map((row: any, rIdx: number) => (
                          <tr key={rIdx} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-5 text-[14px] font-semibold text-navy w-1/3 whitespace-nowrap align-top">
                              {row.name}
                            </td>
                            <td className="py-4 px-5 text-[14.5px] text-[#5f6368] whitespace-pre-line leading-relaxed">
                              {row.courses}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
};

export default SyllabusDetails;
