"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

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

  const [apiData, setApiData] = useState<Record<string, CourseItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/programme-details`);
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
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Programme Details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load programme details.
      </div>
    );
  }

  if (!courseData) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No data found for this department: <strong>{programme}</strong>
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-[#003333] mb-4">
        PROGRAMME DETAILS
      </h2>
      <table className="min-w-full border border-[#9E9E9E] rounded-lg">
        <tbody className="bg-white text-[#003333]">
          {courseData.map((item, index) => (
            <tr key={index} className="border-t border-gray-400 align-top">
              <td className="px-6 py-4 font-medium border-r border-gray-400 w-1/3">
                {item.label}
              </td>
              <td className="px-6 py-4 w-2/3">
                {item?.value && <p>{item?.value}</p>}
                {item?.sections?.map((section, i) => (
                  <div key={i} className="mb-3">
                    {section?.title && (
                      <p className="font-semibold text-[#0E2455] mb-1">
                        {section?.title}
                      </p>
                    )}
                    <ul className="list-disc list-outside ml-4">
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
  );
};

export default ProgrammeDetails;
