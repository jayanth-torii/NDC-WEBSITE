import React from "react";
import PageBanner from "@/components/ui/PageBanner";

const IqacBanner = ({ data }: any) => {
  if (!data) return null;
  const { image, title, description } = data;

  return (
    <PageBanner
      title={title}
      subtitle={description}
      image={image}
      className="rounded-xl mt-10 mb-10 md:mb-20"
    />
  );
};

export default IqacBanner;
