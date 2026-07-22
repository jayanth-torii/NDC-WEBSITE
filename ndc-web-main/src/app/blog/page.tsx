"use client";

import React, { useState, Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BlogCards from "@/components/BlogsPage/BlogCard";
import Pagination from "@/components/BlogsPage/Pagination";
import BlogsBanner from "@/components/BlogsPage/BlogsBanner";

import pageJson from "@/data-export/blog/data.json";

type BannerSectionType = {
  title: string;
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
    <div className="m-auto w-[90%] mb-20">

      <BlogsBanner data={bannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <BlogCards displayedArticles={displayed} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        articlesPerPage={articlesPerPage}
        totalArticles={blogsData.length}
      />
      
    </div>
  );
};

export default BlogList;
