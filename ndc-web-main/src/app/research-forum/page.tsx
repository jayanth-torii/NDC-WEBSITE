import React, { Suspense } from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import Forum from "@/components/ResearchForum/Forum";
import { getResearchForum } from "@/services/data.service";

export const revalidate = 300;

const ResearchForum = async () => {
  const ResearchForumData: any = await getResearchForum();

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
