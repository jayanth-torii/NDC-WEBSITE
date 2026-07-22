"use client";

import { Box } from "@mantine/core";

const VisionMission = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, Sections } = data;

  return (
    <Box className="mb-20 text-[#003333]">
      <h1 className="text-2xl md:text-3xl font-bold text-[#003333] mb-5">{title}</h1>
      <div className=" rounded-lg">
        {Sections?.map(({ title, Description }: any, idx: number) => (
          <div key={title} className="mb-3 bg-[#F9F9F9] p-6">
            <h2 className="text-xl font-semibold text-[#003333] mb-4">{title}</h2>
            <ul className="list-disc space-y-3 text-justify">
              {Description?.map((desc: string, index: number) => (
                <p key={index} className="text-justify text-[#003333] ">{desc}</p>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default VisionMission;
