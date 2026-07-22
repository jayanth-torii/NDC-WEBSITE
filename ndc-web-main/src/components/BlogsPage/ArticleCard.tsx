"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BlogCard = ({ article }: { article: any }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden border border-gray-300 p-6 mb-10">
            <div className="relative w-full md:w-1/2">
                <Image
                    src={article.blogImage}
                    alt={article.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover rounded-md"
                />
                {/* <div className="absolute bottom-0 left-0 bg-[#F09300] text-white text-md font-semibold px-6 py-2 
                    clip-path-triangle">
                    {article.date}
                </div> */}
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col">
            
                <h2 className="text-xl md:text-2xl font-bold text-[#003333]">
                    {article.title}
                </h2>

                <p className="text-[#003333] mt-2 text-justify">
                    {article.description}
                </p>
                {/* <div className="flex items-center mt-4 text-gray-600 text-sm">
                    <span className="mr-2">👤</span>
                    <span>{article.author}</span>
                </div> */}
                <button
                    onClick={() => router.push(`/blog/${article.id}`)}
                    className="mt-6 py-2 bg-[#0E2455] cursor-pointer text-white transition w-1/2"
                >
                    READ MORE
                </button>
            </div>
        </div>
    );
};

export default BlogCard;
