"use client";

import { Box } from "@mantine/core";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const VisionMission = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, Sections } = data;

  return (
    <Box className="mb-20">
      <SectionHeading title={title} className="mb-5" />
      <RevealGroup className="space-y-3">
        {Sections?.map(({ title, Description }: any, idx: number) => (
          <RevealItem key={title}>
            <Card className="p-6" accent="orange-left">
              <h2 className="text-xl font-semibold text-navy mb-4">{title}</h2>
              <div className="space-y-3">
                {Description?.map((desc: string, index: number) => (
                  <p key={index} className="text-justify text-body-gray">{desc}</p>
                ))}
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Box>
  );
};

export default VisionMission;
