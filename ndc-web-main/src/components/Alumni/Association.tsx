"use client";

import { Box } from "@mantine/core";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const Association = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, description } = data;

  return (
    <Reveal as="section">
      <Box className="mb-20">
        <SectionHeading title={title} className="mb-5" />
        <Card className="mb-10 md:mb-20 p-6 md:p-8" accent="orange-left">
          <p className="text-body-gray text-justify">{description}</p>
        </Card>
      </Box>
    </Reveal>
  );
};

export default Association;
