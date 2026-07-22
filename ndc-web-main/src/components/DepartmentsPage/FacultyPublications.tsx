"use client";
import { useState } from "react";
import { Box } from "@mantine/core";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const FacultyPublications = ({ data }: any) => {
  const department = data?.Department_Faculties;
  const books = data?.Books_Published;

  // Build tabs only if there is valid data
  const tabs: Record<string, { type: string; columns: string[]; rows: any[] }> = {};

  if (department && (department.TabName || department.columns || department.Rows)) {
    tabs[department?.TabName || "Department Faculties"] = {
      type: "department",
      columns: Array.isArray(department.columns) ? department.columns : [],
      rows: Array.isArray(department.Rows) ? department.Rows : [],
    };
  }

  if (books && (books.TabName || books.columns || books.TableRow)) {
    tabs[books?.TabName || "Books Published"] = {
      type: "books",
      columns: Array.isArray(books.columns) ? books.columns : [],
      rows: Array.isArray(books.TableRow) ? books.TableRow : [],
    };
  }

  const tabKeys = Object.keys(tabs);

  // Default activeTab to first tab key or empty string if none
  const [activeTab, setActiveTab] = useState<string>(tabKeys.length > 0 ? tabKeys[0] : "");

  // Only assign activeSection if activeTab is a valid key in tabs
  const activeSection =
    activeTab && tabs[activeTab]
      ? tabs[activeTab]
      : { columns: [], rows: [], type: "" };

  const columns = activeSection.columns || [];
  const rows = activeSection.rows || [];

  return (
    <Reveal as="section">
      <Box className="mb-20">
        <SectionHeading
          title={data.Faculty_And_Publications?.title || "Faculty & Publications"}
          className="mb-8"
        />

        {/* Tabs */}
        {tabKeys.length > 0 ? (
          <div className="w-full flex flex-col items-start md:flex-row md:justify-start md:space-x-8 mb-8 border-b border-card-border">
            {tabKeys.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer text-lg md:text-xl font-semibold pb-3 transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  activeTab === tab
                    ? "text-navy border-b-4 border-orange"
                    : "text-body-gray hover:text-navy"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-body-gray">No data to display.</div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-base md:text-lg bg-surface-light text-navy border-b border-card-border text-left">
                {columns.length > 0 ? (
                  columns.map((col: string, index: number) => (
                    <th
                      key={index}
                      className="p-3 border-r border-card-border font-semibold last:border-r-0"
                    >
                      {col}
                    </th>
                  ))
                ) : (
                  <th className="p-3">No columns found</th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row: any, idx: number) => (
                  <tr
                    key={idx}
                    className="bg-white border-b border-card-border text-navy last:border-b-0 hover:bg-surface-light transition-colors duration-200"
                  >
                    {activeSection.type === "department" ? (
                      <>
                        <td className="md:py-4 px-3 border-r border-card-border text-center">
                          {row.Slno || idx + 1}
                        </td>
                        <td className="md:py-4 px-3 border-r border-card-border">
                          <div className="font-semibold">{row.name}</div>
                          <div className="text-body-gray">{row.designation}</div>
                        </td>
                        <td className="md:py-4 px-3 border-r border-card-border text-body-gray">
                          {row.department} {row.experience ? "-" : ""} {row.experience}
                        </td>
                        <td className="md:py-4 px-3 text-body-gray">
                          {row.qualification}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="md:py-4 px-3 border-r border-card-border text-center">
                          {row.Slno || idx + 1}
                        </td>
                        <td className="md:py-4 px-3 border-r border-card-border">
                          <div className="font-semibold">{row.Name}</div>
                          <div className="text-body-gray">{row.Publication_House}</div>
                        </td>
                        <td className="md:py-4 px-3 border-r border-card-border text-body-gray">
                          {row.Book_Title}
                        </td>
                        <td className="md:py-4 px-3 text-body-gray">
                          {row.Edition} {row.year_of_publishing}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length || 1} className="p-3 text-center text-body-gray">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Box>
    </Reveal>
  );
};

export default FacultyPublications;
