"use client";
import { useRouter } from "next/navigation";
import { articles } from "@/app/Data/BlogsPageContent";
import React from "react";

interface BlogNavigationProps {
    currentIndex: number;
}

const BlogNavigation: React.FC<BlogNavigationProps> = ({ currentIndex }) => {
    const router = useRouter();

    const prevBlog = currentIndex > 0 ? articles[currentIndex - 1] : null;
    const nextBlog = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

    const handleNavigation = (blogId: string | number) => {
        // Scroll to the top before navigating
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Navigate to the next or previous blog
        router.push(`/blog/${blogId}`);
    };

    return (
        <div className="mt-6 flex justify-center gap-10 w-full px-4 md:px-8">
            {/* Previous Blog Button */}
            <button
                disabled={!prevBlog}
                className={`px-6 py-2 border border-[#000000] text-[#141629] text-sm sm:text-md transition ${
                    !prevBlog ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-200"
                }`}
                onClick={() => prevBlog && handleNavigation(prevBlog.id)}
            >
                READ PREVIOUS BLOG
            </button>

            {/* Next Blog Button */}
            <button
                disabled={!nextBlog}
                className={`px-6 py-2 bg-[#0E2455] text-white text-sm sm:text-md transition ${
                    !nextBlog ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[#092034]"
                }`}
                onClick={() => nextBlog && handleNavigation(nextBlog.id)}
            >
                READ NEXT BLOG
            </button>
        </div>
    );
};

export default BlogNavigation;
