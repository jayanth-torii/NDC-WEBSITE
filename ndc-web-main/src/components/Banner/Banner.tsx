'use client';

import React from 'react';
import styles from "./Banner.module.css";
import { useLiveData } from "@/hooks/useLiveData";
import { getHeadlineBanner } from "@/services/data.service";

const Banner: React.FC = () => {

  const { data: bannerData } = useLiveData(getHeadlineBanner);

    const title = bannerData?.title?.trim();
    const message = bannerData?.message?.trim();

    if (!title && !message) return null;  

 

  return (
    <div className="bg-orange text-white text-center py-3 px-4 w-full overflow-hidden">
      <div className={`whitespace-nowrap ${styles["animate-marquee_slow"]}`}>
        <p className="text-xl font-bold tracking-wide inline-block">
          {title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {message}
        </p>
      </div>
    </div>
  );
};

export default Banner;