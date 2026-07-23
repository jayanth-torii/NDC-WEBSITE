import React from 'react';
import PageBanner from '@/components/ui/PageBanner';

const DepartmentBanner = ({ data }: any) => {
  if (!data) return null;
  const { title, image } = data;

  return (
    <PageBanner
      title={title}
      image={image}
      className="rounded-2xl mt-8 mb-12 md:mb-16"
    />
  );
};

export default DepartmentBanner;
