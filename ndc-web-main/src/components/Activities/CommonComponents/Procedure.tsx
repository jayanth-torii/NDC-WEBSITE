"use client";
import React from "react";

const Procedure = ({data}:any) => {
  return (
    <div className="mb-10 md:mb-20">
      {data.map((policy:any, index:any) => (
        <div key={index} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0E2455] mb-4">{policy.title}</h1>

          {policy.descriptions?.map((desc:any, idx:any) => (
            <p key={idx} className="text-justify text-[#003333] mb-2">{desc}</p>
          ))}

          <ul className="space-y-2 list-disc pl-5">
            {policy.points?.map((point:any, idx:any) => (
              <li key={idx} className="text-justify text-[#003333]">{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Procedure;
