'use client';

import React from 'react';
import styles from "./Banner.module.css";
import bannerJson from "@/data-export/_shared/banner.json";

const Banner: React.FC = () => {

  const bannerData: Record<string, any> | null = (bannerJson["headline-banner"] as any)?.data ?? null;

    const title = bannerData?.title?.trim();
    const message = bannerData?.message?.trim();

    if (!title && !message) return null;  

 

  return (
    <div className="bg-[#F6872A] text-white text-center py-3 px-4 w-full overflow-hidden">
      <div className={`whitespace-nowrap ${styles["animate-marquee_slow"]}`}>
        <p className="text-xl font-bold tracking-wide inline-block">
          {title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {message}
        </p>
      </div>
    </div>
  );
};

export default Banner;