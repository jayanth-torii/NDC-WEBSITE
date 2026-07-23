"use client";

import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import BlogNavigation from "@/components/BlogsPage/BlogNavigation";
import pageJson from "@/data-export/blog/[id]/data.json";

const BlogDetail = () => {
  const { id } = useParams();

  const blogsData: any[] = (pageJson["blogs-content"] as any)?.data?.blogs || [];
  const blog =
    blogsData.find((item: any) => item.id.toString() === id) || null;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center py-20 text-red-500 text-xl font-bold">
          Blog not found.
        </div>
      </div>
    );
  }

  const currentIndex = blogsData.findIndex((item) => item.id === blog.id);
  const otherBlogs = blogsData.filter((item) => item.id !== blog.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col w-full overflow-hidden">
      
      <GlobalBanner 
        eyebrow="Article"
        title={blog?.title}
        image={blog?.blogImage}
      />

      {/* Content Section */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Article Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {blog?.content?.map((para:any, idx:any) => (
                  <p key={idx} className="mb-5 last:mb-0 text-lg text-[#2c3e50]">{para}</p>
                ))}
              </div>
              
              <div className="mt-12 pt-6 border-t border-gray-100">
                <BlogNavigation currentIndex={currentIndex} />
              </div>
            </div>

            {/* Sidebar: Related Blogs */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold text-[#0e2455] mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                  Related Articles
                </h3>
                
                <div className="flex flex-col gap-6">
                  {otherBlogs.map((relatedItem) => (
                    <Link href={`/blog/${relatedItem.id}`} key={relatedItem.id} className="group flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-orange-200 transition-all duration-300">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <img 
                          src={relatedItem.blogImage} 
                          alt={relatedItem.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-[#0e2455] text-sm leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
                          {relatedItem.title}
                        </h4>
                        <span className="text-xs text-orange-500 font-bold mt-2 uppercase tracking-wider flex items-center gap-1">
                          Read More <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </main>
  );
};

export default BlogDetail;
