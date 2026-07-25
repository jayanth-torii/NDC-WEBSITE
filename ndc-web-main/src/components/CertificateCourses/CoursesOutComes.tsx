import React from "react";
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
  const title = data?.title ?? "";

  const description: string[] = Array.isArray(data?.description)
    ? data!.description
        .map((d) => (typeof d === "string" ? d : d?.text ?? ""))
        .filter(Boolean)
    : [];

  const rows: Row[] = Array.isArray(data?.Table?.Rows) ? data!.Table!.Rows! : [];

  if (!title && description.length === 0 && rows.length === 0) return null;

  return (
    <Reveal as="section" className="mb-10 max-w-7xl mx-auto px-4 lg:px-8">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Description */}
        <div className="mb-8">
          {title && (
            <h2 className="text-xl md:text-2xl lg:text-[26px] font-extrabold text-navy tracking-tight mb-2 uppercase">
              {title}
            </h2>
          )}
          
          {description.length > 0 && (
            <div className="space-y-2">
              {description.map((desc, index) => (
                <p key={index} className="text-[#5f6368] text-[14px] md:text-[15px] leading-relaxed text-justify">
                  {desc}
                </p>
              ))}
            </div>
          )}
        </div>

          {/* Faculty Grid (Replacing the Table) */}
          {rows.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-5xl mx-auto mt-8">
              {rows.map((faculty, index) => {
                const name = faculty.name ?? faculty.Name ?? "";
                const designation = faculty.designation ?? faculty.Designation ?? "";
                const role = faculty.role ?? faculty.Role ?? "";

                return (
                  <div 
                    key={index}
                    className="w-full sm:w-[calc(50%-12px)] max-w-[320px] group relative bg-[#f8f9fa] rounded-[1.5rem] p-6 hover:bg-navy transition-colors duration-500 overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm"
                  >
                    {/* Decorative Circle */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange/10 rounded-full blur-[20px] group-hover:bg-orange/20 transition-colors duration-500" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-10 h-10 rounded-[10px] bg-white flex items-center justify-center mb-4 shadow-sm group-hover:bg-white/10 transition-colors duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <polyline points="16 11 18 13 22 9"></polyline>
                        </svg>
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-bold text-navy mb-1 group-hover:text-white transition-colors duration-300">
                        {name}
                      </h3>
                      
                      {designation && (
                        <p className="text-[#5f6368] text-[13px] font-medium mb-4 group-hover:text-white/70 transition-colors duration-300">
                          {designation}
                        </p>
                      )}
                      
                      <div className="mt-auto pt-4 border-t border-navy/10 group-hover:border-white/10 transition-colors duration-300">
                        <p className="text-[11px] font-bold text-orange tracking-wide uppercase">
                          {role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
    </Reveal>
  );
};

export default CoursesOutCome;
