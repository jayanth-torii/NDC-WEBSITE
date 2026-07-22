import React from 'react';
import Image from 'next/image';
import { Paper } from '@mantine/core';

const BlogsBanner = ({  }: any) => {
  // if (!bannerData) return null;
  // const { title, image } = bannerData;

  return (
    <div className="relative m-auto overflow-hidden mt-10 mb-10 md:mb-20">
      {/* {image && ( */}
        <Paper className="relative w-full aspect-[16/9] md:aspect-[3/1.2] overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
          <Image
            className="object-cover rounded-[18px]"
            // src={image}
            src="/images/BlogsPage/blogs-banner.svg"
            alt="Blogs Banner Image"
            layout="fill"
            priority
          />
          <span className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-orange to-transparent" />
        </Paper>
      {/* )} */}
    </div>
  );
};

export default BlogsBanner;
