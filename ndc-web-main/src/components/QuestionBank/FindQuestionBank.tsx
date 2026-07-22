import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import PdfModal from "../PdfModal";
import Card from "@/components/ui/Card";
import Kicker from "@/components/ui/Kicker";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const DepartmentSemester = ({data}:any) => {
  const subjectsData = data || {};
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [openSemester, setOpenSemester] = useState<string | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);


  const toggleSemester = (semester: string) => {
    setOpenSemester(openSemester === semester ? null : semester);
  };

  const openPdf = (pdf: string) => {
    setSelectedPdf(pdf);
  };

  const closePdf = () => {
    setSelectedPdf(null);
  };

  const departments = Object.keys(subjectsData || {});
  const years = selectedDepartment ? Object.keys(subjectsData[selectedDepartment] || {}) : [];
  const semesters = selectedDepartment && selectedYear
    ? Object.keys(subjectsData[selectedDepartment][selectedYear] || {})
    : [];

  const selectClasses =
    "cursor-pointer w-full rounded-[10px] border border-card-border bg-white p-3 text-heading transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 mb-5";

  return (
    <div className="mx-auto px-1 sm:px-6">
      <h1 className="mb-6 border-l-4 border-orange pl-3 text-xl font-extrabold text-navy sm:text-2xl">
        FIND QUESTION BANK
      </h1>

          {/* Department Selector */}
          <label className="mb-2 block text-sm font-semibold text-body-gray">Select Department:</label>
          <select
            className={selectClasses}
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSelectedYear("");
              setOpenSemester(null);
            }}
          >
            <option className="cursor-pointer" value="">-- Select Department --</option>
            {departments.map((dept) => (
              <option className="cursor-pointer" key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Year Selector */}
          {selectedDepartment && (
            <>
              <label className="mb-2 block text-sm font-semibold text-body-gray">Select Year:</label>
              <select
                className={selectClasses}
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setOpenSemester(null);
                }}
              >
                <option className="cursor-pointer" value="">-- Select Year --</option>
                {years.map((year) => (
                  <option className="cursor-pointer" key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Semester Accordions */}
          {selectedDepartment && selectedYear && (
            <div className="mt-10">
              <Kicker className="mb-5">AVAILABLE SEMESTERS</Kicker>
              {semesters.map((semKey: string) => (
                <div key={semKey} className="mb-3">
                  <button
                    className="flex w-full cursor-pointer items-center justify-between rounded-[10px] border border-card-border bg-surface-light px-4 py-3.5 text-left text-base font-semibold text-navy transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-card-border-hover sm:text-lg"
                    onClick={() => toggleSemester(semKey)}
                  >
                    {semKey.replace("semester", "Semester ")}
                    {openSemester === semKey ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {openSemester === semKey && (
                    <div className="mt-3 pl-1">
                      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-body-gray">Subjects:</h2>
                        {subjectsData[selectedDepartment][selectedYear][semKey]?.length > 0 ? (
                          <RevealGroup className="grid gap-3">
                            {subjectsData[selectedDepartment][selectedYear][semKey].map(
                              (subject: any, index: number) => (
                                <RevealItem key={index}>
                                  <Card
                                    accent="orange-left"
                                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                                  >
                                    <span className="font-medium text-navy">
                                      {subject.subjectName}
                                    </span>
                                    {subject.subjectPdf ? (
                                      <button
                                        className="inline-flex shrink-0 items-center gap-2 self-start rounded-[10px] border-2 border-navy px-4 py-2 text-sm font-bold text-navy transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white sm:self-auto"
                                        onClick={() => openPdf(subject.subjectPdf)}
                                      >
                                        <Download size={16} /> View
                                      </button>
                                    ) : (
                                      <span className="text-sm font-medium text-red-500">No PDF</span>
                                    )}
                                  </Card>
                                </RevealItem>
                              )
                            )}
                          </RevealGroup>
                        ) : (
                          <p className="text-red-500">No subjects available.</p>
                        )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PDF Modal */}
          {selectedPdf && <PdfModal pdfUrl={selectedPdf} onClose={closePdf} />}

    </div>
  );
};

export default DepartmentSemester;
