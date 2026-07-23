"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const BlogCard = ({ article }: { article: any }) => {
    const router = useRouter();

    return (
        <div 
            onClick={() => router.push(`/blog/${article.id}`)}
            className="group flex flex-col cursor-pointer"
        >
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-gray-100 mb-6">
                <Image
                    src={article.blogImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
            </div>
            
            <div className="flex flex-col flex-grow px-2">
                <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase mb-3">
                    Nagarjuna Degree College
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-[#0e2455] leading-snug mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                    {article.title}
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {article.description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-[#0e2455] font-bold text-sm tracking-widest uppercase group-hover:text-orange-500 transition-colors duration-300">
                    Read Article
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
