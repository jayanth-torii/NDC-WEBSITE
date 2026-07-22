"use client";
import React from "react";

const AntiragginCommitte = ({ data }: any) => {
  const { title, descriptions = [], tableSection = [] } = data;

  const hasRole = tableSection.some((row: any) => row.role?.trim());
  const hasContact = tableSection.some((row: any) => row.mobile?.trim() || row.email?.trim());

  return (
    <div className="mb-10 md:mb-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#003333]">{title}</h1>

      {descriptions.map((desc: string, idx: number) => (
        <p key={idx} className="text-justify text-[#003333] mb-3">{desc}</p>
      ))}

      <div className="overflow-x-auto">
        <table className="w-full text-[#003333] border border-gray-300">
          <thead className="text-lg">
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Sl.No</th>
              <th className="py-2 px-4 border border-gray-300 text-left">Faculty</th>
              {hasRole && <th className="py-2 px-4 border border-gray-300 text-left">Role</th>}
              {hasContact && <th className="py-2 px-4 border border-gray-300 text-left">Contact</th>}
            </tr>
          </thead>
          <tbody>
            {tableSection.map((row: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border border-gray-300 text-center">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-300 text-left">
                  <strong>{row.name}</strong><br />{row.designation}
                </td>
                {hasRole && (
                  <td className="py-2 px-4 border border-gray-300 text-left">
                    {row.role}
                  </td>
                )}
                {hasContact && (
                  <td className="py-2 px-4 border border-gray-300 text-left">
                    {row.mobile && <div>{row.mobile}</div>}
                    {row.email && <div>{row.email}</div>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AntiragginCommitte;
