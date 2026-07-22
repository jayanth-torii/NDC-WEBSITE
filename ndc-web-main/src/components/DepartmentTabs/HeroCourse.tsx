"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { DepartmentBanners } from "@/app/Data/DepartmentBanners";
import PageBanner from "@/components/ui/PageBanner";

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
    <PageBanner
      title={content?.title ?? "Programme Not Found"}
      image={content?.image}
    />
  );
};

export default HeroCourse;
