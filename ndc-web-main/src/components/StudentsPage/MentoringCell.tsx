import React from "react";

const MentoringCell = ({MentoringCellData}:any) => {
  const { title, description, GuideLines, table } = MentoringCellData;

  return (
    <div className="min-h-screen text-[#003333] md:px-5">
      {/* Title & Description */}
      <div className="mb-8 text-start">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-justify text-[#0E2455]">{description}</p>
      </div>

      {/* Guidelines Section */}
      {GuideLines && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">{GuideLines.title}</h2>
          <ul className="list-disc list-outside text-[#0E2455] p-6">
            {GuideLines.points.map((item: string, index: number) => (
              <li key={index} className="text-justify">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Table Section */}
      <div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="text-lg">
              <tr>
                <th className="py-2 px-4 border border-gray-300">Sl.No</th>
                <th className="py-2 px-4 border border-gray-300 text-start">Name</th>
                <th className="py-2 px-4 border border-gray-300 text-start">Role</th>
              </tr>
            </thead>
            <tbody>
              {table?.map((row: any, index: number) => (
                <tr key={index} className="text-center border border-gray-300">
                  <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                  <td className="py-2 px-4 border text-start border-gray-300">{row.name}</td>
                  <td className="py-2 px-4 border text-start border-gray-300">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MentoringCell;
