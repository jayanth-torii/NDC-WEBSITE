"use client";

import React, { Suspense } from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import Forum from "@/components/ResearchForum/Forum";
import pageJson from "@/data-export/research-forum/data.json";

const ResearchForum = () => {
  const ResearchForumData: any = (pageJson["research-forum"] as any)?.data || null;

  if (!ResearchForumData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col w-full overflow-hidden">
      <GlobalBanner 
        eyebrow={ResearchForumData.BannerSection.eyebrow}
        title={ResearchForumData.BannerSection.title}
        subtitle={ResearchForumData.BannerSection.subtitle}
        image={ResearchForumData.BannerSection.image}
      />

      <Forum data={ResearchForumData.ResearchForum} />
    </main>
  );
};

export default ResearchForum;
