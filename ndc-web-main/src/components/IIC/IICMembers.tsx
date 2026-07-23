"use client";

import React from "react";
import { Reveal } from "@/components/ui/Reveal";

const IICMembers = ({ data }: { data: any }) => {
  const title = data?.title || "Industry Institute Cell (IIC) Members";
  const table = data?.MembersTable || [];
  const description = data?.description || [];

  const hasRole = table.some((row: any) => row?.role?.trim());
  const hasContact = table.some((row: any) => row?.contact?.trim());

  if (!table.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center justify-center gap-3 text-orange-500 font-bold tracking-[2.4px] uppercase text-sm mb-4">
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
              Members
              <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0e2455] tracking-tight mb-8">
              {title}
            </h2>
            {description.length > 0 && (
              <div className="prose prose-lg mx-auto">
                {description.map((para: string, index: number) => (
                  <p key={index} className="text-[#53545b] text-[18px] leading-[1.8] mb-6 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0e2455] text-white">
                    <th className="py-5 px-6 font-semibold text-sm uppercase tracking-wider w-20 text-center">Sl.No</th>
                    <th className="py-5 px-6 font-semibold text-sm uppercase tracking-wider">Name & Designation</th>
                    {hasRole && <th className="py-5 px-6 font-semibold text-sm uppercase tracking-wider">Role</th>}
                    {hasContact && <th className="py-5 px-6 font-semibold text-sm uppercase tracking-wider">Contact</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {table.map((row: any, index: number) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <td className="py-5 px-6 text-center text-gray-400 font-medium group-hover:text-orange-500 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-5 px-6">
                        <div className="font-bold text-[#0e2455] text-lg mb-1">{row.name?.trim()}</div>
                        <div className="text-gray-500 text-sm font-medium">{row.designation?.trim()}</div>
                      </td>
                      {hasRole && (
                        <td className="py-5 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100">
                            {row.role?.trim()}
                          </span>
                        </td>
                      )}
                      {hasContact && (
                        <td className="py-5 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium border border-orange-100">
                            {row.contact?.trim()}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default IICMembers;
