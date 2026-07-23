"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { DepartmentBanners } from "@/app/Data/DepartmentBanners";
import GlobalBanner from "@/components/GlobalBanner";

const DepartmentBannerWrapper: React.FC = () => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";

  const contentMapping: Record<string, any> = {
    "b.com": DepartmentBanners.BCOM,
    "b.com-bda": DepartmentBanners.Bcom_BDA,
    "bba": DepartmentBanners.BBA,
    "bca": DepartmentBanners.BCA,
    "b.science": DepartmentBanners.BScience,
    "mba": DepartmentBanners.MBA,
    "mca": DepartmentBanners.MCA,
    "m.com": DepartmentBanners.MCom,
  };

  const content = useMemo(() => {
    const normalizedProgramme = programme.toLowerCase().replace(/&/g, "and").trim();
    return contentMapping[normalizedProgramme];
  }, [programme]);

  const title = content?.title || "Department";
  const subtitle = content?.description || "Exploring excellence in education, research, and innovation.";
  const image = content?.image; // e.g. /images/departments/department-banners/b.com.png

  return (
    <GlobalBanner
      title={title}
      subtitle={subtitle}
      badge="ACADEMIC DEPARTMENT"
      image={image}
    />
  );
};

export default DepartmentBannerWrapper;
