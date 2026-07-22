"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

type Row = Record<string, any>;

interface BooksBlock {
  title?: string;
  Columns?: string[];
  BooksTable?: Row[];
}

interface PatentBlock {
  title?: string;
  Columns?: string[];
  Patient_Rights_Table?: Row[];
}

interface DeptData {
  Books?: BooksBlock;
  Patient_Right?: PatentBlock;
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const BooksPatients = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const [apiData, setApiData] = useState<Record<string, DeptData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/books-patients`)
      .then((res) => setApiData(res?.data?.data || {}))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // ✅ Normalize keys once (before any early returns)
  const normalizedMap = useMemo(() => {
    const map: Record<string, DeptData> = {};
    Object.keys(apiData || {}).forEach((k) => {
      map[normalizeKey(k)] = apiData[k];
    });
    return map;
  }, [apiData]);

  const data = useMemo<DeptData | undefined>(
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
  if (loading) return <div className="text-center py-20 text-gray-500 text-lg">Loading BooksPatients Details...</div>;
  if (error) return <div className="text-center py-20 text-red-500 text-lg">Failed to load BooksPatients details.</div>;


  if (!data) {
    return (
      <p className="text-center text-red-500">
        No Books/Patent data available for this department.
      </p>
    );
  }

  const hasBooks =
    Array.isArray(data.Books?.Columns) &&
    data.Books!.Columns!.length > 0 &&
    Array.isArray(data.Books?.BooksTable) &&
    data.Books!.BooksTable!.length > 0;

  const hasPatents =
    Array.isArray(data.Patient_Right?.Columns) &&
    data.Patient_Right!.Columns!.length > 0 &&
    Array.isArray(data.Patient_Right?.Patient_Rights_Table) &&
    data.Patient_Right!.Patient_Rights_Table!.length > 0;

  return (
    <div className="px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0E2455] mb-6">{`Books and Publications (${programme.toUpperCase()})`}</h1>

      {/* Books Table */}
      {hasBooks && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#003333] mb-3">{data?.Books?.title || "Books Published"}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-[#C2C0C017] text-[#003333] border-b border-gray-400">
                  {data?.Books?.Columns?.map((col: string, i: number) => (
                    <th key={i} className="p-3 border-r border-gray-400 text-left">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-base">
                {data?.Books?.BooksTable?.map((row: any, i: number) => (
                  <tr key={i} className="bg-white border-b border-gray-300 text-[#003333] hover:bg-gray-100">
                    {data?.Books?.Columns?.map((col: string, j: number) => {
                      const key = Object.keys(row).find((k) => col.toLowerCase().includes(k.toLowerCase()));
                      return <td key={j} className="py-2 px-3 border-r border-gray-300 whitespace-pre-line">{row[key!] || "-"}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Patent Table */}
      {hasPatents && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#003333] mb-3">{data?.Patient_Right?.title || "Patent Rights"}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-[#C2C0C017] text-[#003333] border-b border-gray-400">
                  {data?.Patient_Right?.Columns?.map((col: string, i: number) => (
                    <th key={i} className="p-3 border-r border-gray-400 text-left">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.Patient_Right?.Patient_Rights_Table?.map((row: any, i: number) => (
                  <tr key={i} className="bg-white border-b border-gray-300 text-[#003333] hover:bg-gray-100">
                    {data?.Patient_Right?.Columns?.map((col: string, j: number) => {
                      let value = "-";
                      if (col.toLowerCase().includes("serial")) value = row?.SlNo || "-";
                      else if (col.toLowerCase().includes("patent & journal")) {
                        value = [row?.Patent_No, row?.Published_Date, row?.Journal_No, row?.Journal_Date]
                          .filter(Boolean)
                          .map((v, idx) => `${["Patent No", "Published Date", "Journal No", "Journal Date"][idx]}: ${v}`)
                          .join("\n");
                      } else if (col.toLowerCase().includes("inventor & grant")) {
                        value = [row?.Inventor && `Inventor: ${row?.Inventor}`, row?.Grant_Year && `Grant Year: ${row?.Grant_Year}`]
                          .filter(Boolean)
                          .join("\n");
                      }
                      return <td key={j} className="py-2 px-3 border-r border-gray-300 whitespace-pre-line">{value}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPatients;
