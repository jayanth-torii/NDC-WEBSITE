'use client';

import React, {useEffect, useState} from 'react';
import styles from "./Banner.module.css";
import axios from "axios";
import { BASE_URL } from "../../config/apiService";

const Banner: React.FC = () => {

  const [bannerData, setBannerData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
      const fetchPlacementContent = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/headline-banner`);
          setBannerData(response?.data?.data);
        } catch (error) {
          console.error("Error fetching Placement sections:", error);
        }
      };
  
      fetchPlacementContent();
    }, []);

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