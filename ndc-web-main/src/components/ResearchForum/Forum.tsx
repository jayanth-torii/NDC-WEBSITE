"use client";
import React from "react";
import Card from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const Forum = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <Reveal className="mb-10 md:mb-20">
      <Card className="p-6 md:p-10">
        <h1 className="mb-5 text-2xl font-extrabold text-navy md:text-3xl">{data.title}</h1>

        {data.description?.map((desc: string, idx: number) => (
          <p key={idx} className="mb-3 text-justify leading-relaxed text-body-gray">{desc}</p>
        ))}

        {data.listOfPoints?.length > 0 && (
          <ul className="mt-4 list-disc space-y-2.5 pl-5 marker:text-orange">
            {data.listOfPoints.map((point: string, idx: number) => (
              <li key={idx} className="text-justify leading-relaxed text-body-gray">{point}</li>
            ))}
          </ul>
        )}
      </Card>
    </Reveal>
  );
};

export default Forum;
