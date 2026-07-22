import React from "react";
import BlogCard from "@/components/BlogsPage/ArticleCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface BlogCardsProps {
    displayedArticles: { id: number; title: string; category: string; description: string; date: string }[];
}

const BlogCards = ({ displayedArticles } : any) => {
    return (
        <RevealGroup className="gap-6 text-base text-justify">
            {displayedArticles.length > 0 ? (
                displayedArticles.map((article: any) => (
                    <RevealItem key={article.id}>
                        <BlogCard article={article} />
                    </RevealItem>
                ))
            ) : (
                <p className="text-justify text-body-gray">No articles found.</p>
            )}
        </RevealGroup>
    );
};

export default BlogCards;
