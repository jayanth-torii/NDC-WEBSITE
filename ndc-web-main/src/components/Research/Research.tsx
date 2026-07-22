"use client";

import { Box } from "@mantine/core";

interface Section {
  title: string;
  points: string[];
}

interface CoursesProps {
  data?: {
    title?: string;
    sections?: Section[];
  };
}

const Courses = ({ data }: CoursesProps) => {
  if (!data) return null;

  const { title, sections } = data;
  
  return (
    <Box className="mb-20 text-[#003333]">
      <h1 className="text-2xl md:text-3xl font-bold text-[#003333] mb-10">{ title}</h1>
      <div className=" rounded-lg">
        { sections?.map(({ title, points }) => (
          <div key={title} className="mb-10 md:mb-20">
            <h2 className="text-xl md:text-2xl font-semibold text-[#003333] mb-4">{title}</h2>
            <ul className="list-disc pl-5 space-y-3 text-justify">
              {points?.map((desc, index) => (
                <li key={index} className="text-justify text-[#003333] ">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Courses;
