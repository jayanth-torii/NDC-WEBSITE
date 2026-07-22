import React from 'react';
import Image from 'next/image';
import { Paper } from '@mantine/core';

const AdmissionBanner = ({ data }: any) => {
  if (!data) return null;
  const { title, image } = data;

  return (
    <div className="relative m-auto overflow-hidden mt-10 mb-10 md:mb-20">
      {image && (
        <Paper className="relative w-full aspect-[16/9] md:aspect-[3/1.2] overflow-hidden rounded-xl">
          <Image
            className="object-cover rounded-xl"
            src={image}
            alt="Admission Banner Image"
            layout="fill"
            priority
          />
        </Paper>
      )}
    </div>
  );
};

export default AdmissionBanner;