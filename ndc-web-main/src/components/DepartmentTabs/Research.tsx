"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

interface ResearchData {
  title?: string;
  points?: string[];
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const Research = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, ResearchData> =
    (departmentJson["department-researches"] as any)?.data || {};

  const normalizedMap = useMemo(() => {
    const map: Record<string, ResearchData> = {};
    Object.keys(apiData || {}).forEach((k) => {
      map[normalizeKey(k)] = apiData[k];
    });
    return map;
  }, [apiData]);

  const data = useMemo<ResearchData | undefined>(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!data) {
    return (
      <p className="text-center text-red-500 mt-4">
        No Research data available.
      </p>
    );
  }

  const points = Array.isArray(data.points) ? data.points : [];

  return (
    <Reveal>
      <div className="space-y-5">
        <header className="pb-4 mb-2 border-b border-navy/10">
          <p className="text-orange text-[10px] font-bold tracking-[0.28em] uppercase mb-2">
            Scholarship
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight">
            {data?.title || "Research"}
          </h2>
        </header>

        <div className="space-y-3">
          {points.length > 0 ? (
            <div className="flex flex-col gap-3">
              {points.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.12, // Wave stagger effect
                    type: "spring",
                    stiffness: 80,
                    damping: 12
                  }}
                  whileHover={{ scale: 1.02, x: 8, transition: { type: "spring", stiffness: 300 } }}
                  className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100 p-4 md:p-5 flex items-start gap-4 group cursor-pointer"
                >
                  <div className="mt-0.5 w-8 h-8 flex items-center justify-center rounded-lg bg-orange/10 shrink-0 text-orange font-black text-sm tabular-nums group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <p className="leading-relaxed text-[14px] font-medium text-[#5f6368] group-hover:text-navy transition-colors duration-300">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-[#5f6368] font-medium text-sm">
              No research points available.
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default Research;
