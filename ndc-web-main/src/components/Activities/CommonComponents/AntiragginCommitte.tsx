"use client";
import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const AntiragginCommitte = ({ data }: any) => {
  const { title, descriptions = [], tableSection = [] } = data;

  const hasRole = tableSection.some((row: any) => row.role?.trim());
  const hasContact = tableSection.some((row: any) => row.mobile?.trim() || row.email?.trim());

  return (
    <div className="mb-10 md:mb-20">
      <SectionHeading title={title} className="mb-6" />

      {descriptions.map((desc: string, idx: number) => (
        <p key={idx} className="text-justify text-body-gray leading-relaxed mb-3">{desc}</p>
      ))}

      <Reveal>
        <div className="overflow-x-auto rounded-[14px] border border-card-border shadow-[var(--shadow-card)]">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="bg-surface-tint text-navy border-b border-card-border">
                <th className="py-3 px-4 border-r border-card-border font-semibold text-center">Sl.No</th>
                <th className="py-3 px-4 border-r border-card-border text-left font-semibold">Faculty</th>
                {hasRole && <th className="py-3 px-4 border-r border-card-border text-left font-semibold">Role</th>}
                {hasContact && <th className="py-3 px-4 text-left font-semibold">Contact</th>}
              </tr>
            </thead>
            <tbody>
              {tableSection.map((row: any, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b border-card-border last:border-b-0 text-body-gray hover:bg-surface-tint/60 transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]"
                >
                  <td className="py-3 px-4 border-r border-card-border text-center">{index + 1}</td>
                  <td className="py-3 px-4 border-r border-card-border text-left">
                    <strong className="text-navy font-semibold">{row.name}</strong><br />{row.designation}
                  </td>
                  {hasRole && (
                    <td className="py-3 px-4 border-r border-card-border text-left">
                      {row.role}
                    </td>
                  )}
                  {hasContact && (
                    <td className="py-3 px-4 text-left">
                      {row.mobile && <div>{row.mobile}</div>}
                      {row.email && <div>{row.email}</div>}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
};

export default AntiragginCommitte;
