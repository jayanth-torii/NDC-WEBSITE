import React from "react";

const IICMembers = ({ data }: { data: any }) => {
  const title = data?.title || "IIC Members";
  const table = data?.MembersTable || [];
  const description = data?.description || [];

  // Determine if optional columns exist
  const hasRole = table.some((row: any) => row?.role?.trim());
  const hasContact = table.some((row: any) => row?.contact?.trim());

  return (
    <div className="mb-10 md:mb-20">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-navy">{title}</h1>

      {description?.map((para: string, index: number) => (
        <p key={index} className="text-justify text-body-gray mb-3 leading-[1.65]">
          {para}
        </p>
      ))}

      <div className="overflow-x-auto rounded-[14px] border border-card-border shadow-[var(--shadow-card)]">
        <table className="w-full min-w-[560px] text-body-gray border-collapse">
          <thead className="text-base">
            <tr className="bg-surface-light">
              <th className="py-3 px-4 border-b border-card-border font-semibold text-navy">Sl. No</th>
              <th className="py-3 px-4 border-b border-card-border text-start font-semibold text-navy">Name & Designation</th>
              {hasRole && <th className="py-3 px-4 border-b border-card-border text-start font-semibold text-navy">Role</th>}
              {hasContact && <th className="py-3 px-4 border-b border-card-border text-start font-semibold text-navy">Contact</th>}
            </tr>
          </thead>
          <tbody>
            {table.map((row: any, index: number) => (
              <tr
                key={index}
                className="text-center border-b border-card-border transition-colors duration-200 hover:bg-surface-light"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 text-start">
                  <strong className="text-navy">{row.name}</strong>
                  <br />
                  {row.designation}
                </td>
                {hasRole && (
                  <td className="py-3 px-4 text-start">{row.role}</td>
                )}
                {hasContact && (
                  <td className="py-3 px-4 text-start">{row.contact}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IICMembers;
