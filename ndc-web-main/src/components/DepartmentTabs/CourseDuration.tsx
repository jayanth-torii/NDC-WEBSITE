"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

interface Section {
  title: string;
  description?: string;
  points?: string[];
}

interface CourseData {
  title: string;
  sections: Section[];
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const CourseDuration = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const [apiData, setApiData] = useState<Record<string, CourseData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course-durations`);
        setApiData(res?.data?.data || {});
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Normalize keys once (before any conditional returns)
  const normalizedMap = useMemo(() => {
    const map: Record<string, CourseData> = {};
    Object.keys(apiData || {}).forEach((k) => {
      map[normalizeKey(k)] = apiData[k];
    });
    return map;
  }, [apiData]);

  const departmentData = useMemo<CourseData | undefined>(
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
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading course duration...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load course duration data.
      </div>
    );
  }

  if (!departmentData || !Array.isArray(departmentData.sections)) {
    return (
      <div className="text-center text-red-500 mt-4">
        No course duration data found for: {programme}
      </div>
    );
  }

  return (
    <div className="text-[#003333] px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">{departmentData?.title}</h1>

      {departmentData?.sections?.map((section, idx) => (
        <div key={idx} className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">{section?.title}</h2>

          {section?.description && (
            <p className="text-base leading-relaxed mb-2 whitespace-pre-line">
              {section?.description}
            </p>
          )}

          {Array.isArray(section?.points) && section?.points?.length > 0 && (
            <ol className="list-decimal pl-6 space-y-1">
              {section?.points?.map((point, index) => (
                <li key={index} className="text-base text-justify">
                  {point}
                </li>
              ))}
            </ol>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseDuration;
