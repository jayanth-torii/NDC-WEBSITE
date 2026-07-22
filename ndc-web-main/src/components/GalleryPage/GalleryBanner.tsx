import React from 'react';
import Image from 'next/image';
import { Paper } from '@mantine/core';

interface BannerProps {
  bannerData: {
    title: string;
    image: string;
    description : string;
  };
}

const GalleryBanner = ({ bannerData }: BannerProps) => {

  const { title, image, description } = bannerData || {};

  return (
    <div className="mb-10 md:mb-20 flex flex-col items-center">

      {image && (
        <Paper className="relative w-full aspect-[16/9] md:aspect-[3/1.2] mb-10 md:mb-20  rounded-xl">
          <Image
            className="object-cover rounded-xl"
            src={image}
            alt="GalleryBanner Image"
            layout="fill"
            priority
          />
        </Paper>
      )}
   

      {/* Description Section */}
      <div className="w-full bg-[#F6F6F6] text-[#0E2455] p-6 md:p-8 lg:p-10 text-center rounded-lg shadow-md">
        <p className="text-justify md:text-xl font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};

export default GalleryBanner;



 
