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

  const [apiData, setApiData] = useState<Record<string, AdmissionData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admission-processes`);
        setApiData(res?.data?.data || {});
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading admission process...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load admission process data.
      </div>
    );
  }

  if (!departmentData || !Array.isArray(departmentData.sections)) {
    return (
      <div className="text-center py-10 text-red-500">
        No admission process data found for: {programme}
      </div>
    );
  }

  return (
    <div className="text-[#003333] p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">{departmentData?.title}</h1>
      {departmentData?.sections.map((section, idx) => (
        <div key={idx}>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{section.title}</h2>

          {section?.description && (
            <p className="text-base leading-relaxed whitespace-pre-line mb-2">
              {section?.description}
            </p>
          )}

          {Array.isArray(section?.points) && section?.points?.length > 0 && (
            <ul className="list-disc pl-6 space-y-1">
              {section?.points?.map((point, i) => (
                <li key={i} className="text-base text-justify">
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdmissionProcess;
