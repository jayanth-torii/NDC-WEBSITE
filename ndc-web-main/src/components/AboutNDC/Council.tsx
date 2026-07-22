"use client";
import React, { useState } from "react";

const Council = ({ data }: any) => {
  const { title, members = [] } = data || {};

  const [visibleCount, setVisibleCount] = useState(5);
  const [isAllVisible, setIsAllVisible] = useState(false);

  const toggleVisibility = () => {
    setVisibleCount(isAllVisible ? 5 : members.length);
    setIsAllVisible(!isAllVisible);
  };

  if (!members.length) return null;

  return (
    <div className="mb-10 md:mb-20">
      <h1 className="text-2xl md:text-3xl text-[#003333] font-bold mb-6 text-left">
        {title}
      </h1>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-500 min-w-[600px]">
          <thead>
            <tr className="bg-[#C2C0C017] text-[#003333] border-b border-gray-500">
              <th className="p-3 border-r text-lg border-gray-500 ">SI.No</th>
              <th className="p-3 border-r text-lg border-gray-500 text-start">Name & Designation</th>
              <th className="p-3 text-lg border-gray-500 text-start">Role – Governing Council</th>
            </tr>
          </thead>
          <tbody>
            {members.slice(0, visibleCount).map((member:any, index:any) => (
              <tr key={index} className="border-b border-gray-500 hover:bg-gray-200 text-[#003333]">
                <td className="py-3 px-2 border border-gray-500 text-center">
                  {index + 1}
                </td>
                <td className="py-3 px-2 border border-gray-500">
                  {member.name}
                  <br />
                  <span className="text-sm text-[#003333]">{member?.designation}</span>
                </td>
                <td className="py-3 px-2 border border-gray-500">{member?.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toggle Button */}
      {members?.length > 5 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={toggleVisibility}
            className="cursor-pointer px-8 md:px-12 py-3 border-2 border-[#003333] text-[#003333] font-semibold rounded-sm hover:bg-gray-800 hover:text-white transition duration-300 text-sm md:text-base"
          >
            {isAllVisible ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Council;
