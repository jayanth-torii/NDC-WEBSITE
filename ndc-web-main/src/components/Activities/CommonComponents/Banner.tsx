import React from 'react';
import PageBanner from '@/components/ui/PageBanner';

const Banner = ({ data }: any) => {
  if (!data) return null;
  const { title, image } = data;

  return <PageBanner title={title} image={image} />;
};

export default Banner;
