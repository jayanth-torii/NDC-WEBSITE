import React from 'react';
import PageBanner from '@/components/ui/PageBanner';

const SamashtiBanner = ({ data }: any) => {
  if (!data) return null;
  const { title, image } = data;

  return (
    <PageBanner
      title={title}
      image={image}
      className="rounded-xl mt-10 mb-10 md:mb-20"
    />
  );
};

export default SamashtiBanner;
