import React from "react";
import BlogCard from "@/components/BlogsPage/ArticleCard";

interface BlogCardsProps {
    displayedArticles: { id: number; title: string; category: string; description: string; date: string }[];
}

const BlogCards = ({ displayedArticles } : any) => {
    return (
        <div className="gap-6 text-base text-justify">
            {displayedArticles.length > 0 ? (
                displayedArticles.map((article: any) => <BlogCard key={article.id} article={article} />)
            ) : (
                <p className="text-justify text-gray-600">No articles found.</p>
            )}
        </div>
    );
};

export default BlogCards;
