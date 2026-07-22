"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./AboutCourse.module.css";
import axios from "axios";
 
import { DepartmentBanners } from "@/app/Data/DepartmentBanners";


const HeroCourse: React.FC = () => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";

  const contentMapping: Record<string, any> = {
       "b.com" :DepartmentBanners.BCOM,
       "b.com-bda" : DepartmentBanners.Bcom_BDA,
       "bba" : DepartmentBanners.BBA,
       "bca": DepartmentBanners.BCA,
       "b.science": DepartmentBanners.BScience,
       "mba": DepartmentBanners.MBA,
       "mca": DepartmentBanners.MCA,
       "m.com": DepartmentBanners.MCom,
   
  };

  // Normalize the programme from URL
  const normalizedProgramme = programme.toLowerCase().replace(/&/g, "and").trim();
  const content = contentMapping[normalizedProgramme];

  
 

  return (
    <div
      className={styles.mainContainer}
      style={{
        backgroundImage: content ? `url(${content.image || content.image})` : "none",
      }}
    >
      <div className={styles.subContainer1}>
        <h2>{content?.title ?? "Programme Not Found"}</h2>
        {/* <div className={styles.subContainer2}>
          <h2>{content?.title ?? "Programme Not Found"}</h2>
          <p>{content?.description ?? "Please check the programme name in the URL."}</p>
        </div> */}
      </div>
    </div>
  );
};

export default HeroCourse;
