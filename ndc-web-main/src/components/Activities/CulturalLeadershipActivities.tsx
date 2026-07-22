"use client"

import React, { useState } from 'react'

 
const CulturalLeadershipActivities = ({data}:any) => {
  const [activeTab, setActiveTab] = useState(0)
  const sections = data.Sections

  return (
    <div className="mb-20">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0E2455] mb-5">{data.title.replace(/_/g, " ")}</h1>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row gap-x-5">
        {sections?.map((section:any, idx:any) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`cursor-pointer text-start py-2 !text-[#003333] !text-lg ${
              activeTab === idx ? "!border-b-4 !border-[#F09300] !font-bold" :""
            }`}
            style={{ width: "fit-content" }}
          >
            {section.TabName}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4 mt-6">
        {/* About */}
        {sections[activeTab].About && (
          <div className="flex flex-col md:flex-row items-start gap-4">
            {
              sections[activeTab].About.image && (
                <img
                  src={sections[activeTab].About.image}
                  alt="About"
                  className="w-64 h-auto rounded shadow"
                />
              )
            }
            <div>
              {sections[activeTab].About.descriptions?.map((desc:any, i:any) => (
                <p key={i} className="text-justify text-[#003333] mb-2">{desc.text}</p>
              ))}
            </div>
          </div>
        )}

        {/* Vision & Mission */}
        {sections[activeTab].VisionMission?.map((vm:any, idx:any) => (
          <div className='mb-5' key={idx}>
            <h2 className="text-[#003333] mb-2 font-semibold">{vm.title}</h2>
            <p className="text-[#003333] mb-2">{vm.description}</p>
            {vm.points?.length > 0 && (
              <ul className="list-disc ml-6 text-[#003333] space-y-1">
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
            <h2 className="text-xl text-[#003333] mb-2 font-semibold">{sec.title}</h2>
            <ul className="list-disc ml-6 text-[#003333] space-y-1">
              {sec.ListPoints.map((p:any, i:any) => (
                <li key={i}>{p.text}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Image Carousel (scrollable) */}
        {sections[activeTab].images?.length > 0 && (
          <div className="flex overflow-x-auto gap-4 py-4">
            {sections[activeTab].images.map((img:any, idx:any) => (
              <img
                key={idx}
                src={img}
                alt={`activity-${idx}`}
                className="w-64 h-auto flex-shrink-0 rounded shadow"
              />
            ))}
          </div>
        )}

        {/* Table */}
        {sections[activeTab].Table_Section && (
          <div className="mt-8">
            <h2 className="text-xl text-[#003333] font-semibold mb-2">
              {sections[activeTab].Table_Section.title}
            </h2>

            <table className="w-full text-[#003333] border border-gray-300">
              <thead className="md:text-lg bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border border-gray-300">Sl.No</th>
                  <th className="py-2 px-4 border border-gray-300 text-left">Faculty</th>
                  <th className="py-2 px-4 border border-gray-300 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {sections[activeTab].Table_Section.Rows.map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border border-gray-300 text-center">{row.Slno}</td>
                    <td className="py-2 px-4 border border-gray-300 text-left font-semibold">{row.name}</td>
                    <td className="py-2 px-4 border border-gray-300 text-left">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}

export default CulturalLeadershipActivities
