"use client";

import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import BlogNavigation from "@/components/BlogsPage/BlogNavigation";
import pageJson from "@/data-export/blog/[id]/data.json";
import { Target, Star, BarChart, ClipboardCheck, Clock, Hourglass, PartyPopper, Microscope, Leaf, GraduationCap, Stethoscope, Wifi, Car, Globe, Lightbulb } from "lucide-react";

const renderIcon = (name: string, size = 24) => {
  switch (name) {
    case "Target": return <Target size={size} strokeWidth={1.5} />;
    case "Star": return <Star size={size} fill="currentColor" strokeWidth={0} />;
    case "BarChart": return <BarChart size={size} strokeWidth={1.5} />;
    case "ClipboardCheck": return <ClipboardCheck size={size} strokeWidth={1.5} />;
    case "Clock": return <Clock size={size} strokeWidth={1.5} />;
    case "Hourglass": return <Hourglass size={size} strokeWidth={1.5} />;
    case "PartyPopper": return <PartyPopper size={size} strokeWidth={1.5} />;
    case "Microscope": return <Microscope size={size} strokeWidth={1.5} />;
    case "Leaf": return <Leaf size={size} strokeWidth={1.5} />;
    case "GraduationCap": return <GraduationCap size={size} strokeWidth={1.5} />;
    case "Stethoscope": return <Stethoscope size={size} strokeWidth={1.5} />;
    case "Wifi": return <Wifi size={size} strokeWidth={1.5} />;
    case "Car": return <Car size={size} strokeWidth={1.5} />;
    case "Globe": return <Globe size={size} strokeWidth={1.5} />;
    case "Lightbulb": return <Lightbulb size={size} strokeWidth={1.5} />;
    default: return <Target size={size} />;
  }
};

const BlogDetail = () => {
  const { id } = useParams();

  const blogsData: any[] = (pageJson["blogs-content"] as any)?.data?.blogs || [];
  const blog = blogsData.find((item: any) => item.id.toString() === id) || null;

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
  const prevBlogId = currentIndex > 0 ? blogsData[currentIndex - 1].id : null;
  const nextBlogId = currentIndex < blogsData.length - 1 ? blogsData[currentIndex + 1].id : null;
  const otherBlogs = blogsData.filter((item) => item.id !== blog.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#fafbfc] flex flex-col w-full overflow-hidden">
      
      <GlobalBanner 
        eyebrow="Article"
        title={blog?.title}
        image={blog?.blogImage}
      />

      {/* Content Section */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-24 bg-white relative">
        {/* Subtle dot background */}
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Main Article Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {blog?.content?.map((para: any, idx: any) => {
                  if (typeof para === "string") {
                    return <p key={idx} className="mb-5 last:mb-0 text-lg text-[#2c3e50]">{para}</p>;
                  }

                  if (para.type === "header-icon") {
                    return (
                      <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 mt-4">
                        <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
                           <div className="absolute inset-0 border-[2px] border-dashed border-orange rounded-full opacity-40 animate-[spin_20s_linear_infinite]" />
                           <div className="absolute inset-4 bg-[#fff5ef] rounded-full shadow-inner" />
                           <div className="text-navy relative z-10">{renderIcon(para.icon, 40)}</div>
                           {/* Decorative dots */}
                           <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange rounded-full" />
                           <div className="absolute bottom-4 left-0 w-1.5 h-1.5 bg-orange/60 rounded-full" />
                        </div>
                        <div>
                          <h2 className="text-[32px] md:text-[40px] font-extrabold text-navy mb-3 leading-tight tracking-tight">{para.title}</h2>
                          <p className="text-[17px] text-gray-600 leading-relaxed">{para.text}</p>
                        </div>
                      </div>
                    );
                  }

                  if (para.type === "numbered-block") {
                    return (
                      <div key={idx} className="mb-12">
                        <div className="flex gap-5">
                          <div className="flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#fff5ef] text-orange font-bold shrink-0 text-[17px] shadow-sm">
                            {para.number}
                          </div>
                          <div className="pt-1.5">
                            {para.title && <h3 className="text-[20px] font-bold text-navy mb-3 leading-snug">{para.title}</h3>}
                            <p className="text-[17px] text-gray-600 leading-relaxed">{para.text}</p>
                          </div>
                        </div>
                        {para.callout && (
                          <div className={`mt-8 ml-[66px] ${para.callout.icon === 'PartyPopper' ? 'bg-[#f8fafd] border border-gray-100 rounded-2xl p-6 shadow-sm relative overflow-hidden flex items-center gap-5' : 'bg-[#fff5ef] border-l-[4px] border-orange p-6 rounded-r-2xl flex items-center gap-5'}`}>
                            {para.callout.icon === 'PartyPopper' && (
                               <>
                                 <div className="absolute top-3 right-6 w-1.5 h-1.5 bg-orange/40 rounded-full" />
                                 <div className="absolute bottom-4 right-10 w-2 h-2 bg-navy/20 rounded-full" />
                                 <div className="absolute top-8 right-20 w-1 h-1 bg-blue-300 rounded-full" />
                               </>
                            )}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${para.callout.icon === 'PartyPopper' ? 'text-orange' : 'bg-orange text-white shadow-md'}`}>
                              {renderIcon(para.callout.icon, para.callout.icon === 'PartyPopper' ? 36 : 22)}
                            </div>
                            <p className={`text-[17px] font-bold ${para.callout.icon === 'PartyPopper' ? 'text-navy text-xl' : 'text-navy'}`}>{para.callout.text}</p>
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (para.type === "numbered-list-block") {
                    return (
                      <div key={idx} className="mb-12">
                        <div className="flex gap-5 mb-8">
                          <div className="flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#fff5ef] text-orange font-bold shrink-0 text-[17px] shadow-sm">
                            {para.number}
                          </div>
                          <div className="pt-1.5">
                            {para.title && <h3 className="text-[20px] font-bold text-navy mb-3 leading-snug">{para.title}</h3>}
                            <p className="text-[17px] text-gray-600 leading-relaxed">{para.text}</p>
                          </div>
                        </div>
                        <div className="ml-6 relative pl-12 border-l-[2px] border-dashed border-orange/30 flex flex-col gap-10 py-2">
                          {para.list.map((item: any, i: number) => (
                            <div key={i} className="relative">
                              <div className="absolute -left-[70px] top-0 w-11 h-11 bg-white rounded-full flex items-center justify-center text-navy shadow-[0_4px_15px_rgba(0,0,0,0.06)] z-10 border border-gray-100/50">
                                {renderIcon(item.icon, 20)}
                              </div>
                              <h4 className="font-bold text-navy text-[17px] mb-2">{item.title}</h4>
                              <p className="text-gray-600 leading-relaxed text-[16px]">{item.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
              
              <div className="mt-16 pt-8 border-t border-gray-100/60">
                <BlogNavigation prevBlogId={prevBlogId} nextBlogId={nextBlogId} />
              </div>
            </div>

            {/* Sidebar: Related Blogs */}
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <h3 className="text-xl font-extrabold text-navy mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-orange rounded-full"></span>
                  Related Articles
                </h3>
                
                <div className="flex flex-col gap-5">
                  {otherBlogs.map((relatedItem) => (
                    <Link href={`/blog/${relatedItem.id}`} key={relatedItem.id} className="group flex gap-5 bg-white p-4 rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:border-orange/30 transition-all duration-300">
                      <div className="relative w-[110px] h-[110px] rounded-2xl overflow-hidden flex-shrink-0 bg-[#f8fafd]">
                        <img 
                          src={relatedItem.blogImage} 
                          alt={relatedItem.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex flex-col justify-center py-1">
                        <h4 className="font-extrabold text-navy text-[15px] leading-snug line-clamp-3 group-hover:text-orange transition-colors duration-300">
                          {relatedItem.title}
                        </h4>
                        <span className="text-[11px] text-orange font-extrabold mt-3 uppercase tracking-[0.1em] flex items-center gap-1.5">
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
