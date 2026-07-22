import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

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
        <Reveal>
          <SectionHeading title={title} align="left" className="mb-6" />
        </Reveal>
      )}

      {description.length > 0 && (
        <Reveal>
          <div className="text-body-gray leading-relaxed mb-6">
            {description.map((desc, index) => (
              <p key={index} className="text-justify mb-2">
                {desc}
              </p>
            ))}
          </div>
        </Reveal>
      )}

      {/* Faculties Table */}
      {rows.length > 0 && (
        <Reveal>
          <div className="overflow-x-auto rounded-2xl border border-card-border shadow-[var(--shadow-card)]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-sm sm:text-base bg-navy text-white text-left">
                  <th className="p-4 font-semibold">SI.No</th>
                  <th className="p-4 font-semibold">Name &amp; Designation</th>
                  <th className="p-4 font-semibold">Role - Governing Council</th>
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
                      className="border-t border-card-border text-body-gray hover:bg-surface-light transition-colors duration-200"
                    >
                      <td className="py-4 px-4 align-top">
                        {sl}.
                      </td>
                      <td className="py-4 px-4 align-top">
                       <span className="font-semibold text-navy">{name}</span>
                        <br />
                        {designation}
                      </td>
                      <td className="py-4 px-4 align-top">
                        {role}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      )}
    </div>
  );
};

export default CoursesOutCome;
