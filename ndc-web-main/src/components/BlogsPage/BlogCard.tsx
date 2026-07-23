import React from "react";
import BlogCard from "@/components/BlogsPage/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";

interface BlogCardsProps {
    displayedArticles: { id: number; title: string; category: string; description: string; date: string }[];
}

const BlogCards = ({ displayedArticles } : any) => {
    return (
        <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {displayedArticles.length > 0 ? (
                    displayedArticles.map((article: any) => (
                        <BlogCard key={article.id} article={article} />
                    ))
                ) : (
                    <p className="text-justify text-gray-500 col-span-full">No articles found.</p>
                )}
            </div>
        </Reveal>
    );
};

export default BlogCards;
