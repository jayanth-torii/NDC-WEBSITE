import React from "react";
import BlogListClient from "@/components/BlogsPage/BlogListClient";
import { getBlogs, getBlogBanner } from "@/services/data.service";

export const revalidate = 300;

const BlogList = async () => {
  const [blogsData, bannerSection] = await Promise.all([getBlogs(), getBlogBanner()]);

  if (!blogsData) return null;

  return <BlogListClient blogsData={blogsData} bannerSection={bannerSection} />;
};

export default BlogList;
