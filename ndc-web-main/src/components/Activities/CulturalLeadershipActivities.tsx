"use client"

import React, { useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

// Picks a column count that keeps the grid's last row filled rather than
// leaving a lone card next to dead empty space (e.g. 4 items in 3 columns
// would strand 1 card alone in row 2). A single item goes full width instead
// of shrinking to a small card stranded in an otherwise empty row.
function gridColsForCount(count: number, maxCols: 2 | 3 = 3) {
  if (count <= 1) return "";
  if (count === 2 || maxCols === 2) return "md:grid-cols-2";
  if (count % 3 === 1) return "md:grid-cols-2";
  return "md:grid-cols-2 xl:grid-cols-3";
}

const CulturalLeadershipActivities = ({data}:any) => {
  const [activeTab, setActiveTab] = useState(0)
  const sections = data.Sections

  return (
    <div className="mb-20">
      <SectionHeading title={data.title.replace(/_/g, " ")} className="mb-8" />

      {/* Pill Tabs */}
      <div className="flex overflow-x-auto gap-3 mb-10 pb-2 no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {sections?.map((section:any, idx:any) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`whitespace-nowrap flex-shrink-0 cursor-pointer text-center px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ease-[var(--ease-editorial)] border-2 ${
              activeTab === idx 
                ? "bg-navy text-white border-navy shadow-[0_8px_20px_rgba(14,36,85,0.2)]" 
                : "bg-transparent text-body-gray border-card-border hover:border-orange hover:text-navy"
            }`}
          >
            {section.TabName}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Reveal key={activeTab} className="space-y-8 mt-6">
        {/* About */}
        {sections[activeTab].About && (
          <div className="flex flex-col lg:flex-row items-stretch gap-8 bg-surface-tint p-6 md:p-8 rounded-[24px] border border-card-border shadow-[var(--shadow-card)]">
            {
              sections[activeTab].About.image && (
                <div className="flex-shrink-0 w-full lg:w-72">
                  <img
                    src={sections[activeTab].About.image}
                    alt="About"
                    className="w-full h-full object-cover rounded-[16px] shadow-sm"
                  />
                </div>
              )
            }
            <div className="flex flex-col justify-center">
              {sections[activeTab].About.descriptions?.map((desc:any, i:any) => (
                <p key={i} className="text-justify text-body-gray leading-relaxed mb-4 last:mb-0 text-[16px] md:text-[17px]">
                  {desc.text}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Vision & Mission Cards */}
        {sections[activeTab].VisionMission?.length > 0 && (
          <div className={`grid grid-cols-1 gap-6 ${gridColsForCount(sections[activeTab].VisionMission.length, 2)}`}>
            {sections[activeTab].VisionMission?.map((vm:any, idx:any) => (
              <div className="bg-white p-6 md:p-8 rounded-[20px] border border-card-border shadow-[var(--shadow-card)] relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] hover:border-orange/30" key={idx}>
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-300 pointer-events-none text-navy text-8xl font-black italic">
                  {vm.title.charAt(0)}
                </div>
                <h2 className="text-navy mb-4 font-bold text-2xl relative z-10 flex items-center gap-3">
                  <span className="w-2 h-8 bg-orange rounded-full inline-block"></span>
                  {vm.title}
                </h2>
                <p className="text-body-gray leading-relaxed mb-4 relative z-10">{vm.description}</p>
                {vm.points?.length > 0 && (
                  <ul className="list-disc ml-6 text-body-gray space-y-2 marker:text-orange relative z-10">
                    {vm.points.map((p:any, i:any) => (
                      <li key={i}>{p.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Other Sections (Grid layout — sized to actual item count so a lone card doesn't leave a dead gap) */}
        {sections[activeTab].OtherSections?.length > 0 && (
          <div className={`grid grid-cols-1 gap-6 ${gridColsForCount(sections[activeTab].OtherSections.length, 3)}`}>
            {sections[activeTab].OtherSections?.map((sec:any, idx:any) => (
              <div key={idx} className="bg-surface-light p-6 md:p-8 rounded-[20px] border border-card-border shadow-sm">
                <h2 className="text-xl text-navy mb-4 font-bold pb-2 border-b-2 border-orange/20 inline-block">{sec.title}</h2>
                <ul
                  className={`list-none space-y-3 text-body-gray mt-2 ${
                    sections[activeTab].OtherSections.length === 1 && sec.ListPoints.length > 4
                      ? "md:columns-2 md:gap-x-10"
                      : ""
                  }`}
                >
                  {sec.ListPoints.map((p:any, i:any) => (
                    <li key={i} className="flex items-start gap-3 break-inside-avoid">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2 flex-shrink-0"></span>
                      <span className="leading-relaxed">{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Image Carousel (scrollable) */}
        {sections[activeTab].images?.length > 0 && (
          <div className="pt-4">
            <h2 className="text-xl text-navy font-bold mb-4">Gallery</h2>
            <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar snap-x" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {sections[activeTab].images.map((img:any, idx:any) => (
                <img
                  key={idx}
                  src={img}
                  alt={`activity-${idx}`}
                  className="w-72 h-48 object-cover flex-shrink-0 snap-start rounded-[16px] border border-card-border shadow-[var(--shadow-card)] transition-transform duration-300 ease-[var(--ease-editorial)] hover:-translate-y-2 hover:shadow-[var(--shadow-card-hover)]"
                />
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        {sections[activeTab].Table_Section && (
          <div className="mt-10">
            {sections[activeTab].Table_Section.title && (
               <h2 className="text-2xl text-navy font-bold mb-5 flex items-center gap-3">
                 <span className="w-1.5 h-6 bg-orange rounded-full inline-block"></span>
                 {sections[activeTab].Table_Section.title}
               </h2>
            )}

            <div className="overflow-x-auto rounded-[20px] border border-card-border shadow-[var(--shadow-card)] bg-white">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="bg-surface-tint border-b border-card-border">
                    <th className="py-4 px-6 border-r border-card-border font-bold text-navy text-left uppercase tracking-wider text-sm w-24">Sl.No</th>
                    <th className="py-4 px-6 border-r border-card-border font-bold text-navy text-left uppercase tracking-wider text-sm">Faculty</th>
                    <th className="py-4 px-6 font-bold text-navy text-left uppercase tracking-wider text-sm">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {sections[activeTab].Table_Section.Rows.map((row: any, index: number) => (
                    <tr key={index} className="group border-b border-card-border last:border-b-0 hover:bg-surface-tint/60 transition-colors duration-250 ease-[var(--ease-editorial)]">
                      <td className="py-4 px-6 border-r border-card-border text-left font-medium text-body-gray">{row.Slno}</td>
                      <td className="py-4 px-6 border-r border-card-border text-left font-bold text-navy group-hover:text-orange transition-colors">{row.name}</td>
                      <td className="py-4 px-6 text-left">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange/10 text-orange font-semibold text-sm">
                          {row.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </Reveal>
    </div>
  )
}

export default CulturalLeadershipActivities
