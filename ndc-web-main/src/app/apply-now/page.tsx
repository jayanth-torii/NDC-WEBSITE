"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ApplyNowBanner from "@/components/ApplyNow/ApplyNowBanner";
import QueryForm from "@/components/ApplyNow/QueryForm";
import pageJson from "@/data-export/apply-now/data.json";

const ApplyNow = () => {
  const applyData: any = (pageJson["apply-now"] as any)?.data || null;

  if (!applyData) {
    return null;
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <ApplyNowBanner data={applyData.BannerSection} />

      <QueryForm />
    </Box>
  );
};

export default ApplyNow;
