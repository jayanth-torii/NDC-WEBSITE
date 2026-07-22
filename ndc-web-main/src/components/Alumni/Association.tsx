"use client";

import { Box } from "@mantine/core";

const Association = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, description } = data;

  return (

    <Box className="mb-20 text-[#003333]">
      <h1 className="text-2xl md:text-3xl font-bold text-[#003333] mb-5">{title}</h1>
      <div className=" rounded-lg">
          <div  className="mb-10 md:mb-20 p-6 bg-[#F9F9F9]">
            <ul className="list-disc space-y-3 text-justify">
                <p className="text-[#003333] ">{description}</p>
            </ul>
          </div>
      </div>
    </Box>
  );
};

export default Association;
