"use client"

import React, { useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'


const CulturalLeadershipActivities = ({data}:any) => {
  const [activeTab, setActiveTab] = useState(0)
  const sections = data.Sections

  return (
    <div className="mb-20">
      <SectionHeading title={data.title.replace(/_/g, " ")} className="mb-5" />

      {/* Tabs */}
      <div className="border-b border-card-border flex flex-col md:flex-row gap-x-6 mb-6">
        {sections?.map((section:any, idx:any) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`cursor-pointer text-start !text-lg pb-3 border-b-[3px] -mb-px transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              activeTab === idx ? "text-navy border-orange !font-bold" : "text-body-gray border-transparent hover:text-navy"
            }`}
            style={{ width: "fit-content" }}
          >
            {section.TabName}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <Reveal key={activeTab} className="space-y-4 mt-6">
        {/* About */}
        {sections[activeTab].About && (
          <div className="flex flex-col md:flex-row items-start gap-4">
            {
              sections[activeTab].About.image && (
                <img
                  src={sections[activeTab].About.image}
                  alt="About"
                  className="w-64 h-auto rounded-[14px] border border-card-border shadow-[var(--shadow-card)]"
                />
              )
            }
            <div>
              {sections[activeTab].About.descriptions?.map((desc:any, i:any) => (
                <p key={i} className="text-justify text-body-gray leading-relaxed mb-2">{desc.text}</p>
              ))}
            </div>
          </div>
        )}

        {/* Vision & Mission */}
        {sections[activeTab].VisionMission?.map((vm:any, idx:any) => (
          <div className='mb-5' key={idx}>
            <h2 className="text-navy mb-2 font-semibold text-lg">{vm.title}</h2>
            <p className="text-body-gray leading-relaxed mb-2">{vm.description}</p>
            {vm.points?.length > 0 && (
              <ul className="list-disc ml-6 text-body-gray space-y-1 marker:text-orange">
                {vm.points.map((p:any, i:any) => (
                  <li key={i}>{p.text}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Other Sections */}
        {sections[activeTab].OtherSections?.map((sec:any, idx:any) => (
          <div key={idx}>
            <h2 className="text-xl text-navy mb-2 font-semibold">{sec.title}</h2>
            <ul className="list-disc ml-6 text-body-gray space-y-1 marker:text-orange">
              {sec.ListPoints.map((p:any, i:any) => (
                <li key={i}>{p.text}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Image Carousel (scrollable) */}
        {sections[activeTab].images?.length > 0 && (
          <div className="flex overflow-x-auto gap-4 py-4 no-scrollbar">
            {sections[activeTab].images.map((img:any, idx:any) => (
              <img
                key={idx}
                src={img}
                alt={`activity-${idx}`}
                className="w-64 h-auto flex-shrink-0 rounded-[14px] border border-card-border shadow-[var(--shadow-card)] transition-transform duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1"
              />
            ))}
          </div>
        )}

        {/* Table */}
        {sections[activeTab].Table_Section && (
          <div className="mt-8">
            <h2 className="text-xl text-navy font-semibold mb-3">
              {sections[activeTab].Table_Section.title}
            </h2>

            <div className="overflow-x-auto rounded-[14px] border border-card-border shadow-[var(--shadow-card)]">
              <table className="w-full min-w-[480px] border-collapse">
                <thead>
                  <tr className="bg-surface-tint text-navy border-b border-card-border">
                    <th className="py-3 px-4 border-r border-card-border font-semibold text-center">Sl.No</th>
                    <th className="py-3 px-4 border-r border-card-border text-left font-semibold">Faculty</th>
                    <th className="py-3 px-4 text-left font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {sections[activeTab].Table_Section.Rows.map((row: any, index: number) => (
                    <tr key={index} className="bg-white border-b border-card-border last:border-b-0 text-body-gray hover:bg-surface-tint/60 transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]">
                      <td className="py-3 px-4 border-r border-card-border text-center">{row.Slno}</td>
                      <td className="py-3 px-4 border-r border-card-border text-left font-semibold text-navy">{row.name}</td>
                      <td className="py-3 px-4 text-left">{row.role}</td>
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
