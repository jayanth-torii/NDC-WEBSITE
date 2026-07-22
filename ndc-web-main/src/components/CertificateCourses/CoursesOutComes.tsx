import React from "react";

type Row = {
  Slno?: string | number;
  slNo?: string | number;
  slno?: string | number;
  name?: string;
  Name?: string;
  designation?: string;
  Designation?: string;
  role?: string;
  Role?: string;
};

type CourseOutcomeBlock = {
  title?: string;
  description?: Array<string | { text?: string }>;
  Table?: { Rows?: Row[] };
};

const CoursesOutCome = ({ data }: { data?: CourseOutcomeBlock }) => {
  // Safely read props with fallbacks
  const title = data?.title ?? "";

  const description: string[] = Array.isArray(data?.description)
    ? data!.description
        .map((d) => (typeof d === "string" ? d : d?.text ?? ""))
        .filter(Boolean)
    : [];

  const rows: Row[] = Array.isArray(data?.Table?.Rows) ? data!.Table!.Rows! : [];

  // Optional: render nothing if there's nothing to show
  if (!title && description.length === 0 && rows.length === 0) return null;

  return (
    <div className="mb-20">
      {/* Title and Description */}
      {title && (
        <h1 className="text-2xl md:text-3xl text-[#003333] font-bold mb-6 text-left">
          {title}
        </h1>
      )}

      {description.length > 0 && (
        <div className="text-[#003333] leading-relaxed mb-4">
          {description.map((desc, index) => (
            <p key={index} className="text-justify mb-2">
              {desc}
            </p>
          ))}
        </div>
      )}

      {/* Faculties Table */}
      {rows.length > 0 && (
        <div className="overflow-x-auto border border-gray-400">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-lg bg-[#C2C0C017] text-[#003333] border-b border-gray-400 text-left">
                <th className="p-3 border-r border-gray-400">SI.No</th>
                <th className="p-3 border-r border-gray-400">Name &amp; Designation</th>
                <th className="p-3 border-r border-gray-400">Role - Governing Council</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((faculty, index) => {
                const sl =
                  faculty.Slno ?? faculty.slNo ?? faculty.slno ?? index + 1;
                const name = faculty.name ?? faculty.Name ?? "";
                const designation =
                  faculty.designation ?? faculty.Designation ?? "";
                const role = faculty.role ?? faculty.Role ?? "";

                return (
                  <tr
                    key={index}
                    className="bg-[#C2C0C017] border-b border-gray-400 text-[#003333] hover:bg-gray-200"
                  >
                    <td className="py-5 px-3 border-r border-gray-400">
                      {sl}.
                    </td>
                    <td className="py-5 px-3 border-r border-gray-400">
                     <span className="font-semibold">{name}</span>
                      <br />
                      {designation}
                    </td>
                    <td className="py-5 px-3 border-r border-gray-400">
                      {role}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CoursesOutCome;
