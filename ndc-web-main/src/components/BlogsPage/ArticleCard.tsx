"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const BlogCard = ({ article }: { article: any }) => {
    const router = useRouter();

    return (
        <Card accent="orange-left" className="flex flex-col md:flex-row overflow-hidden mb-10">
            <div className="relative w-full md:w-1/2">
                <Image
                    src={article.blogImage}
                    alt={article.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col">

                <h2 className="text-xl md:text-2xl font-bold text-navy">
                    {article.title}
                </h2>

                <p className="text-body-gray mt-2 text-justify leading-relaxed">
                    {article.description}
                </p>

                <Button
                    variant="primary"
                    type="button"
                    className="mt-6 w-fit"
                    onClick={() => router.push(`/blog/${article.id}`)}
                >
                    READ MORE
                </Button>
            </div>
        </Card>
    );
};

export default BlogCard;
