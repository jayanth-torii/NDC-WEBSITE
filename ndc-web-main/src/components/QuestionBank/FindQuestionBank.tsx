import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import PdfModal from "../PdfModal";

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

  return (
    <div className="px-6 mx-auto">
      <h1 className="text-2xl font-bold mb-4">FIND QUESTION BANK</h1>

          {/* Department Selector */}
          <label className="block mb-2">Select Department:</label>
          <select
            className="cursor-pointer w-full p-3 border border-gray-300 rounded mb-5"
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
              <label className="block mb-2">Select Year:</label>
              <select
                className="cursor-pointer w-full p-3 border border-gray-300 rounded mb-5"
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
              <h2 className="text-2xl font-semibold mb-5">AVAILABLE SEMESTERS</h2>
              {semesters.map((semKey: string) => (
                <div key={semKey} className="mb-2">
                  <button
                    className="flex justify-between items-center w-full text-left text-lg font-semibold px-3 py-4 rounded bg-[#F6F6F6] cursor-pointer hover:bg-gray-200"
                    onClick={() => toggleSemester(semKey)}
                  >
                    {semKey.replace("semester", "Semester ")}
                    {openSemester === semKey ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {openSemester === semKey && (
                    <div className="mt-2 p-3 border-l-2 border-gray-300">
                      <h2 className="text-lg font-semibold">Subjects:</h2>
                      <ul className="list-disc list-inside mt-2">
                        {subjectsData[selectedDepartment][selectedYear][semKey]?.length > 0 ? (
                          subjectsData[selectedDepartment][selectedYear][semKey].map(
                            (subject: any, index: number) => (
                              <div
                                key={index}
                                className="flex justify-between items-center px-3 py-2 mb-2 border-b-2 border-gray-300"
                              >
                                <span className="text-blue-900 font-medium text-xl">
                                  {subject.subjectName}
                                </span>
                                {subject.subjectPdf ? (
                                  <button
                                    className="flex items-center border border-black cursor-pointer px-5 py-0 rounded bg-white text-blue-900 hover:text-white hover:bg-blue-900 transition"
                                    onClick={() => openPdf(subject.subjectPdf)}
                                  >
                                    View <AiOutlineArrowRight className="ml-2" />
                                  </button>
                                ) : (
                                  <span className="text-red-500 text-sm">No PDF</span>
                                )}
                              </div>
                            )
                          )
                        ) : (
                          <p className="text-red-500">No subjects available.</p>
                        )}
                      </ul>
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
