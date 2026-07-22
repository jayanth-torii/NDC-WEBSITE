import React from "react";
import Image from "next/image";
import { Paper } from "@mantine/core";

const IqacBanner = ({ data }: any) => {

  if (!data) return null;
  const { image, title, description } = data;

  return (
    <div className="relative w-full overflow-hidden mt-10 mb-10 md:mb-20">
      <Paper className="relative w-full aspect-[16/9] md:aspect-[3/1.2] overflow-hidden rounded-xl">
        {image && (
          <Image
            className="object-cover rounded-xl"
            src={image}
            alt="IqacBanner Image"
            layout="fill"
            priority
          />
        )}

        <div className="absolute bottom-0 left-0 w-full flex flex-col text-left text-white p-4 md:p-16 bg-gradient-to-t from-black/60 to-transparent">
          <div className="bg-[#47474759] bg-opacity-50 text-white p-6 md:p-8 rounded-lg max-w-lg mt-4">
            <h2 className="w-[80%] border-b-[6px] border-white text-2xl md:text-5xl font-bold tracking-[0.5em]">
              {title}
            </h2>
            <p className="mt-2 text-md"> {description}</p>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default IqacBanner;