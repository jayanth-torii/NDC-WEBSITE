
import React from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const CompositionCell = ({ data }: any) => {
  const title = data.title;
  const table = data.tableSection || [];

  return (
    <Reveal as="section" className="mb-10 md:mb-20">
      <SectionHeading title={title} className="mb-6" />

      <div className="overflow-x-auto rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
        <table className="w-full text-navy border-collapse">
          <thead className="text-base md:text-lg">
            <tr className="bg-surface-light border-b border-card-border">
              <th className="py-3 px-4 border-r border-card-border font-semibold">Sl.No</th>
              <th className="py-3 px-4 border-r border-card-border text-start font-semibold">Name &amp; Designation</th>
              <th className="py-3 px-4 text-start font-semibold">Category</th>
              {/* <th className="py-2 px-4 border border-gray-300 text-start">Contact</th> */}
            </tr>
          </thead>
          <tbody>
            {table.map((row: any, index: number) => (
              <tr key={index} className="text-center border-b border-card-border last:border-b-0 hover:bg-surface-light transition-colors duration-200">
                <td className="py-3 px-4 border-r border-card-border">{index + 1}</td>
                <td className="py-3 px-4 border-r text-start border-card-border">
                  <strong>{row.name}</strong>
                  <br />
                  <span className="text-body-gray">{row.designation}</span>
                </td>
                <td className="py-3 px-4 text-start text-body-gray">{row.role}</td>
                {/* <td className="py-2 px-4 border text-start border-gray-300">{row?.contact}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
};

export default CompositionCell;
