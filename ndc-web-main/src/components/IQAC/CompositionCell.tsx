
import React from "react";

const CompositionCell = ({ data }: any) => {
  const title = data.title;
  const table = data.tableSection || [];

  return (
    <div className="mb-10 md:mb-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#003333]">{title}</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-[#003333] border border-gray-300">
          <thead className="text-lg">
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-300">Sl.No</th>
              <th className="py-2 px-4 border border-gray-300 text-start">Name & Designation</th>
              <th className="py-2 px-4 border border-gray-300 text-start">Category</th>
              {/* <th className="py-2 px-4 border border-gray-300 text-start">Contact</th> */}
            </tr>
          </thead>
          <tbody>
            {table.map((row: any, index: number) => (
              <tr key={index} className="text-center border border-gray-300 hover:bg-gray-100 cursor-pointer">
                <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                <td className="py-2 px-4 border text-start border-gray-300">
                  <strong>{row.name}</strong>
                  <br />
                  {row.designation}
                </td>
                <td className="py-2 px-4 border text-start border-gray-300">{row.role}</td>
                {/* <td className="py-2 px-4 border text-start border-gray-300">{row?.contact}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompositionCell;

