"use client";
import { useState } from "react";
import { Box } from "@mantine/core";

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
    <Box className="mb-20">
      <h1 className="text-2xl md:text-3xl font-bold text-[#003333] mb-8">
        {data.Faculty_And_Publications?.title || "Faculty & Publications"}
      </h1>

      {/* Tabs */}
    {tabKeys.length > 0 ? (
      <div className="w-full flex flex-col items-start md:flex-row md:justify-start md:space-x-8 mb-10 border-b border-gray-300">
        {tabKeys.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[#003333] cursor-pointer text-xl !font-semibold pb-2 ${
              activeTab === tab ? "border-b-4 md:border-b-8 border-[#FFB300]" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    ) : (
      <div>No data to display.</div>
    )}

      {/* Table */}
      <div className="overflow-x-auto border border-gray-400 shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-lg bg-[#C2C0C017] text-[#003333] border-b border-gray-400 text-left">
              {columns.length > 0 ? ( columns.map((col: string, index: number) => (
                <th
                  key={index}
                  className="p-3 border-r border-gray-400 text-lg"
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
            {rows.length > 0 ? (rows.map((row: any, idx: number) => (
              <tr
                key={idx}
                className=" bg-white border-b border-gray-400 text-[#003333] hover:bg-gray-200"
              >
                {activeSection.type === "department" ? (
                  <>
                    <td className="md:py-4 px-3 border-r border-gray-400 text-center">
                      {row.Slno || idx + 1}
                    </td>
                    <td className="md:py-4 px-3 border-r border-gray-400">
                      <div className="font-semibold">{row.name}</div>
                      <div className="text-gray-700">{row.designation}</div>
                    </td>
                    <td className="md:py-4 px-3 border-r border-gray-400">
                      {row.department} {row.experience ? "-" : "" } {row.experience}
                    </td>
                    <td className="md:py-4 px-3">
                      {row.qualification }
                    </td>
                  </>
                ) : (
                  <>
                    <td className="md:py-4 px-3 border-r border-gray-400 text-center">
                      {row.Slno || idx + 1}
                    </td>
                    <td className="md:py-4 px-3 border-r border-gray-400">
                      <div className="font-semibold">{row.Name}</div>
                      <div className="text-gray-700">{row.Publication_House}</div>
                    </td>
                    <td className="md:py-4 px-3 border-r border-gray-400">
                      {row.Book_Title }
                    </td>
                    <td className="md:py-4 px-3">
                      {row.Edition} {row.year_of_publishing }
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length || 1} className="p-3 text-center">
                No records found
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default FacultyPublications;
