"use client";

import React, { useState, useEffect, Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BlogCards from "@/components/BlogsPage/BlogCard";
import Pagination from "@/components/BlogsPage/Pagination";
import BlogsBanner from "@/components/BlogsPage/BlogsBanner";

import axios from "axios";
import { BASE_URL } from "@/config/apiService";

type BannerSectionType = {
  title: string;
  image: string;
};

const BlogList = () => {
  const articlesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [blogsData, setBlogsData] = useState<any[]>([]);
  const [bannerSection, setBannerSection] = useState<BannerSectionType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogsContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs-content`);
        const data = response?.data?.data;
  
        setBlogsData(data?.blogs);
        setBannerSection(data?.BannerSection || null);
      } catch (error) {
        console.error("Error Fetching blogsData Data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogsContent();
  }, []);

  const totalPages = Math.ceil(blogsData.length / articlesPerPage);
  const startIndex = currentPage * articlesPerPage;
  const displayed = blogsData.slice(startIndex, startIndex + articlesPerPage);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Blogs...
      </div>
    );
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
