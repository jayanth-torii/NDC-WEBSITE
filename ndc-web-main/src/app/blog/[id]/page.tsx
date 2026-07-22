"use client";

import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import BlogNavigation from "@/components/BlogsPage/BlogNavigation";
import pageJson from "@/data-export/blog/[id]/data.json";

const BlogDetail = () => {
  const { id } = useParams();

  const blogsData: any[] = (pageJson["blogs-content"] as any)?.data?.blogs || [];
  const blog =
    blogsData.find((item: any) => item.id.toString() === id) || null;

  if (!blog) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        Blog not found.
      </div>
    );
  }

  const currentIndex = blogsData.findIndex((item) => item.id === blog.id);

  return (
    <div className="m-auto w-[90%] bg-white mb-20">
      <img
        className="mt-10 mb-10 border border-gray-500 rounded-lg w-full h-auto md:h-[80vh] object-fill"
        src={blog?.blogImage}
        alt={blog?.title}
      />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <div className="text-justify text-gray-700 leading-relaxed whitespace-pre-line">
        {blog?.content?.map((para:any, idx:any) => (
          <p key={idx} className="mb-4">{para}</p>
        ))}
      </div>


      <BlogNavigation currentIndex={currentIndex} />
    </div>
  );
};

export default BlogDetail;
