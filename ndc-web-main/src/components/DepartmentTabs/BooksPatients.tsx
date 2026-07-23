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

  const apiData: Record<string, DeptData> =
    (departmentJson["books-patients"] as any)?.data || {};

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

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

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
      <div>
        <header className="pb-6 mb-8 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Publications
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            {`Books and Publications (${programme.toUpperCase()})`}
          </h1>
        </header>

        {hasBooks && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-navy mb-4 tracking-tight flex items-baseline gap-3">
              <span className="text-orange text-[11px] tracking-[0.16em]">01</span>
              {data?.Books?.title || "Books Published"}
            </h2>
            <div className="overflow-x-auto border border-navy/10">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-navy text-white">
                    {data?.Books?.Columns?.map((col: string, i: number) => (
                      <th
                        key={i}
                        className="p-3.5 text-left text-sm font-semibold tracking-wide border-r border-white/10 last:border-r-0"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.Books?.BooksTable?.map((row: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-navy/10 text-body-gray hover:bg-surface-light/80 transition-colors duration-250 even:bg-surface-light/40"
                    >
                      {data?.Books?.Columns?.map((col: string, j: number) => {
                        const key = Object.keys(row).find((k) =>
                          col.toLowerCase().includes(k.toLowerCase())
                        );
                        return (
                          <td
                            key={j}
                            className="py-3.5 px-3.5 border-r border-navy/8 last:border-r-0 whitespace-pre-line text-sm"
                          >
                            {row[key!] || "-"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {hasPatents && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-navy mb-4 tracking-tight flex items-baseline gap-3">
              <span className="text-orange text-[11px] tracking-[0.16em]">02</span>
              {data?.Patient_Right?.title || "Patent Rights"}
            </h2>
            <div className="overflow-x-auto border border-navy/10">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-navy text-white">
                    {data?.Patient_Right?.Columns?.map((col: string, i: number) => (
                      <th
                        key={i}
                        className="p-3.5 text-left text-sm font-semibold tracking-wide border-r border-white/10 last:border-r-0"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.Patient_Right?.Patient_Rights_Table?.map(
                    (row: any, i: number) => (
                      <tr
                        key={i}
                        className="border-b border-navy/10 text-body-gray hover:bg-surface-light/80 transition-colors duration-250 even:bg-surface-light/40"
                      >
                        {data?.Patient_Right?.Columns?.map(
                          (col: string, j: number) => {
                            let value = "-";
                            if (col.toLowerCase().includes("serial"))
                              value = row?.SlNo || "-";
                            else if (
                              col.toLowerCase().includes("patent & journal")
                            ) {
                              value = [
                                row?.Patent_No,
                                row?.Published_Date,
                                row?.Journal_No,
                                row?.Journal_Date,
                              ]
                                .filter(Boolean)
                                .map(
                                  (v, idx) =>
                                    `${
                                      [
                                        "Patent No",
                                        "Published Date",
                                        "Journal No",
                                        "Journal Date",
                                      ][idx]
                                    }: ${v}`
                                )
                                .join("\n");
                            } else if (
                              col.toLowerCase().includes("inventor & grant")
                            ) {
                              value = [
                                row?.Inventor && `Inventor: ${row?.Inventor}`,
                                row?.Grant_Year &&
                                  `Grant Year: ${row?.Grant_Year}`,
                              ]
                                .filter(Boolean)
                                .join("\n");
                            }
                            return (
                              <td
                                key={j}
                                className="py-3.5 px-3.5 border-r border-navy/8 last:border-r-0 whitespace-pre-line text-sm"
                              >
                                {value}
                              </td>
                            );
                          }
                        )}
                      </tr>
                    )
                  )}
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
