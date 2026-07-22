"use client";
import { useRouter } from "next/navigation";
import { articles } from "@/app/Data/BlogsPageContent";
import React from "react";
import Button from "@/components/ui/Button";

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
        <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-10 w-full px-4 md:px-8">
            {/* Previous Blog Button */}
            <Button
                variant="ghost"
                type="button"
                disabled={!prevBlog}
                className={!prevBlog ? "pointer-events-none opacity-50" : ""}
                onClick={() => prevBlog && handleNavigation(prevBlog.id)}
            >
                READ PREVIOUS BLOG
            </Button>

            {/* Next Blog Button */}
            <Button
                variant="primary"
                type="button"
                disabled={!nextBlog}
                className={!nextBlog ? "pointer-events-none opacity-50" : ""}
                onClick={() => nextBlog && handleNavigation(nextBlog.id)}
            >
                READ NEXT BLOG
            </Button>
        </div>
    );
};

export default BlogNavigation;
