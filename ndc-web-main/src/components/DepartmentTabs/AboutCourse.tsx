"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

// Normalize any key (e.g., "B.Com" => "bcom", "Bcom_BDA" => "bcombda")
const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const AboutCourse = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/about-departments`);
        setApiData(res?.data?.data || {});
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading About Department...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load department data.
      </div>
    );
  }

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
    <div className="md:px-6 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0E2455]">
        {departmentData?.title || "About Department"}
      </h1>

      {/* Sections */}
      {departmentData?.sections?.map((section: any, idx: number) => (
        <div key={idx} className="bg-[#F6F6F6] p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#0E2455] mb-2">
            {section?.title}
          </h2>
          <ul className="list-disc ml-5 space-y-2 text-[#003333]">
            {section?.points?.map((pt: string, j: number) => (
              <li className="text-justify" key={j}>{pt}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Vision */}
      {departmentData?.vision?.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold text-[#f09300] mb-2">Vision</h2>
          <ul className="list-disc ml-5 space-y-2 text-[#003333]">
            {departmentData.vision.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Mission */}
      {departmentData?.mission?.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <h2 className="text-xl font-semibold text-[#f09300] mb-2">Mission</h2>
          <ul className="list-disc ml-5 space-y-2 text-[#003333]">
            {departmentData.mission.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AboutCourse;
