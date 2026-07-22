"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ResearchForumBanner from "@/components/ResearchForum/ResearchForumBanner";
import Forum from "@/components/ResearchForum/Forum";

import pageJson from "@/data-export/research-forum/data.json";

const ResearchForum = () => {
  const ResearchForumData: any = (pageJson["research-forum"] as any)?.data || null;

  if (!ResearchForumData) {
    return null;
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <ResearchForumBanner data={ResearchForumData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <Forum data={ResearchForumData.ResearchForum} />
    </Box>
  );
};

export default ResearchForum;
