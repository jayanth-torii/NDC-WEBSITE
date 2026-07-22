"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

interface ResearchData {
  title?: string;
  points?: string[];
}

// Same normalization as other components
const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const Research = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";

  const normalizedProgramme = normalizeKey(programme);

  
    const [apiData, setApiData] = useState<Record<string, ResearchData>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/department-researches`);
          setApiData(res?.data?.data || {});
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
  // ✅ Normalize keys once (hook before any returns)
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

  // ✅ Notify parent whether programme key exists in response
  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  // ---- UI returns after all hooks ----
    if (loading) {
      return (
        <div className="text-center py-20 text-gray-500 text-lg">
          Loading Research Details...
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="text-center py-20 text-red-500 text-lg">
          Failed to load Research details.
        </div>
      );
    }
  
    if (!data) {
      return (
        <p className="text-center text-red-500 mt-4">
          No Research data available.
        </p>
      );
    }

  const points = Array.isArray(data.points) ? data.points : [];

  return (
    <div className="mt-10 md:mt-0">
      <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-[#003333]">{data?.title}</h2>

      <ol className="list-decimal list-outside pl-6 h-[500px] overflow-y-auto custom-scrollbar pr-4">
        {points?.map((item, idx) => (
          <li
            key={idx}
            className="text-base text-justify ml-2 text-[#4D4D4D] mb-2 border-b border-[#AFAFAF] py-2"
          >
            {item}
          </li>
        ))}
        {points.length === 0 && (
          <li className="text-base text-justify text-[#4D4D4D]">
            No research points available.
          </li>
        )}
      </ol>

      <style jsx>{
      `.custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f3f3;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f09300;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d87d00;
        }`
        }</style>
    </div>
  );
};

export default Research;
