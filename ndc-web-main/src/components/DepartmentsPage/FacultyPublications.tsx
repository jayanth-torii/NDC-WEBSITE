"use client";

import { useState } from "react";
import { User, Book, GraduationCap, Award, Calendar } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const FacultyPublications = ({ data }: any) => {
  const department = data?.Department_Faculties;
  const books = data?.Books_Published;

  const tabs: Record<string, { type: string; columns: string[]; rows: any[] }> =
    {};

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
  const [activeTab, setActiveTab] = useState<string>(
    tabKeys.length > 0 ? tabKeys[0] : ""
  );

  const activeSection =
    activeTab && tabs[activeTab]
      ? tabs[activeTab]
      : { columns: [], rows: [], type: "" };

  const rows = activeSection.rows || [];

  return (
    <Reveal as="section" className="relative border-b border-navy/10 bg-surface-light">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
              Directory
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-navy tracking-[-0.03em] leading-tight">
              {data?.title || "Faculty & Publications"}
            </h2>
          </div>

          {tabKeys.length > 0 && (
            <div className="flex gap-0 border-b border-navy/15">
              {tabKeys.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
                    activeTab === tab
                      ? "text-navy"
                      : "text-body-gray hover:text-navy"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                  )}
                </button>
              ))}
            </div>
          )}
        </header>

        {tabKeys.length === 0 && (
          <div className="text-body-gray italic text-center py-12">
            No data to display.
          </div>
        )}

        {rows.length > 0 ? (
          <RevealGroup className="flex flex-col border-t border-navy/10">
            {rows.map((row: any, idx: number) => (
              <RevealItem key={idx}>
                {activeSection.type === "department" ? (
                  <article className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 border-b border-navy/10 group hover:bg-white/70 transition-colors duration-300 -mx-2 px-2">
                    <div className="md:col-span-1 flex items-start">
                      <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums pt-1">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="md:col-span-4 flex items-start gap-3">
                      <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-navy/5 text-navy group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                        <User size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy text-lg leading-tight">
                          {row.name}
                        </h3>
                        <p className="text-orange text-sm font-medium mt-1">
                          {row.designation}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-3 flex items-start gap-2">
                      <Award size={16} className="text-navy/30 mt-1 shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-body-gray/70 font-bold mb-0.5">
                          Department & Exp
                        </p>
                        <p className="text-sm text-body-gray">
                          {row.department}
                          {row.experience ? ` · ${row.experience}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-4 flex items-start gap-2">
                      <GraduationCap
                        size={16}
                        className="text-navy/30 mt-1 shrink-0"
                      />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-body-gray/70 font-bold mb-0.5">
                          Qualification
                        </p>
                        <p className="text-sm text-body-gray">{row.qualification}</p>
                      </div>
                    </div>
                  </article>
                ) : (
                  <article className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 border-b border-navy/10 group hover:bg-white/70 transition-colors duration-300 -mx-2 px-2">
                    <div className="md:col-span-1 flex items-start">
                      <span className="text-orange text-[11px] font-bold tracking-[0.16em] tabular-nums pt-1">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="md:col-span-5 flex items-start gap-3">
                      <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-navy/5 text-navy group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                        <Book size={18} />
                      </div>
                      <h3 className="font-bold text-navy text-lg leading-snug">
                        {row.Book_Title}
                      </h3>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-body-gray/70 font-bold mb-0.5">
                        Author
                      </p>
                      <p className="text-sm font-medium text-navy">{row.Name}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-body-gray/70 font-bold mb-0.5">
                        Edition
                      </p>
                      <p className="text-sm font-medium text-orange">{row.Edition}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-body-gray/70 font-bold mb-0.5">
                        Publisher
                      </p>
                      <p className="text-sm text-body-gray line-clamp-2">
                        {row.Publication_House}
                      </p>
                      <p className="text-xs text-body-gray/70 mt-1 flex items-center gap-1">
                        <Calendar size={12} />
                        {row.year_of_publishing}
                      </p>
                    </div>
                  </article>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          tabKeys.length > 0 && (
            <div className="border border-dashed border-navy/15 py-16 text-center text-body-gray">
              No records found for {activeTab}
            </div>
          )
        )}
      </div>
    </Reveal>
  );
};

export default FacultyPublications;
