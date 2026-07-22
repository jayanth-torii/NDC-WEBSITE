"use client";
import React from "react";

const VisionMission = ({data}:any) => {
  return (
    <div className="mb-10 space-y-6 md:mb-20">
      {data.map((policy:any, index:any) => (
        <div key={index} className="rounded-[18px] border border-card-border bg-white p-6 shadow-[var(--shadow-card)]">
          <h1 className="mb-4 text-xl font-bold text-navy md:text-2xl">{policy.title}</h1>

          {policy.descriptions?.map((desc:any, idx:any) => (
            <p key={idx} className="mb-2 text-justify text-body-gray">{desc}</p>
          ))}

          <ul className="list-disc space-y-2 pl-5 marker:text-orange">
            {policy.points?.map((point:any, idx:any) => (
              <li key={idx} className="text-justify text-body-gray">{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default VisionMission;
