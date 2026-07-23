"use client";

import React, { useState, Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BlogCards from "@/components/BlogsPage/BlogCard";
import Pagination from "@/components/BlogsPage/Pagination";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";

import pageJson from "@/data-export/blog/data.json";

type BannerSectionType = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
};

const BlogList = () => {
  const articlesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const blogsContent: any = (pageJson["blogs-content"] as any)?.data || null;
  const blogsData: any[] = blogsContent?.blogs || [];
  const bannerSection: BannerSectionType | null = blogsContent?.BannerSection || null;

  const totalPages = Math.ceil(blogsData.length / articlesPerPage);
  const startIndex = currentPage * articlesPerPage;
  const displayed = blogsData.slice(startIndex, startIndex + articlesPerPage);

  if (!blogsContent) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col w-full overflow-hidden">
      <GlobalBanner 
        eyebrow={bannerSection?.eyebrow || "Insights & Updates"}
        title={bannerSection?.title || "BLOG"}
        subtitle={bannerSection?.subtitle || "Discover the latest news, ideas, and academic insights from Nagarjuna Degree College."}
        image={bannerSection?.image || "https://cdn.nagarjunadegreecollege.co.in/Rectangle_174_8969614918.png"}
      />

      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <BlogCards displayedArticles={displayed} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        articlesPerPage={articlesPerPage}
        totalArticles={blogsData.length}
      />
      
      </div>
    </main>
  );
};

export default BlogList;
