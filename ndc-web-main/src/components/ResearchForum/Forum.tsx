"use client";
import React from "react";

const Forum = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className="mb-10 md:mb-20 bg-[#F6F6F6] p-6 rounded-md">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0E2455] mb-4">{data.title}</h1>

      {data.description?.map((desc: string, idx: number) => (
        <p key={idx} className="text-justify text-[#003333] mb-2">{desc}</p>
      ))}

      {data.listOfPoints?.length > 0 && (
        <ul className="list-disc pl-5 mt-4 space-y-2">
          {data.listOfPoints.map((point: string, idx: number) => (
            <li key={idx} className="text-justify text-[#003333]">{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Forum;
