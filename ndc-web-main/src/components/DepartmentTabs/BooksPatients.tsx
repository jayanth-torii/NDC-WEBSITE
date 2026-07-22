"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import departmentJson from "@/data-export/department/data.json";
import { Reveal } from "@/components/ui/Reveal";

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

  const apiData: Record<string, DeptData> = (departmentJson["books-patients"] as any)?.data || {};

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
    <Reveal>
      <div className="px-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.5px] mb-6">{`Books and Publications (${programme.toUpperCase()})`}</h1>

        {/* Books Table */}
        {hasBooks && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-navy mb-3">{data?.Books?.title || "Books Published"}</h2>
            <div className="overflow-x-auto rounded-[14px] border border-card-border">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-surface-tint text-navy border-b border-card-border">
                    {data?.Books?.Columns?.map((col: string, i: number) => (
                      <th key={i} className="p-3 border-r border-card-border text-left font-semibold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-base">
                  {data?.Books?.BooksTable?.map((row: any, i: number) => (
                    <tr key={i} className="bg-white border-b border-card-border text-body-gray hover:bg-surface-tint/60 transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]">
                      {data?.Books?.Columns?.map((col: string, j: number) => {
                        const key = Object.keys(row).find((k) => col.toLowerCase().includes(k.toLowerCase()));
                        return <td key={j} className="py-3 px-3 border-r border-card-border whitespace-pre-line">{row[key!] || "-"}</td>;
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
            <h2 className="text-xl font-semibold text-navy mb-3">{data?.Patient_Right?.title || "Patent Rights"}</h2>
            <div className="overflow-x-auto rounded-[14px] border border-card-border">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-surface-tint text-navy border-b border-card-border">
                    {data?.Patient_Right?.Columns?.map((col: string, i: number) => (
                      <th key={i} className="p-3 border-r border-card-border text-left font-semibold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.Patient_Right?.Patient_Rights_Table?.map((row: any, i: number) => (
                    <tr key={i} className="bg-white border-b border-card-border text-body-gray hover:bg-surface-tint/60 transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]">
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
                        return <td key={j} className="py-3 px-3 border-r border-card-border whitespace-pre-line">{value}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
};

export default BooksPatients;
