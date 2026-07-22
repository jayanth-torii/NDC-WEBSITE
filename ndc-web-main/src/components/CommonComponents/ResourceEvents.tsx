"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import { AiOutlineArrowRight } from "react-icons/ai";
import Image from "next/image";
import Card from "@/components/ui/Card";

interface TabbedSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    tabsList: string[];
    tabContent: { [key: string]: { name: string; path: string }[] };
    basePath: string;
}

const TabbedSection: React.FC<TabbedSectionProps> = ({
    title,
    description,
    imageSrc,
    tabsList,
    tabContent,
    basePath,
}) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<string>(tabsList[0] || "");

    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (tabsList.includes(hash)) {
            setSelectedTab(hash);
        }
    }, []);

    useEffect(() => {
        if (selectedTab) {
            window.location.hash = selectedTab;
        }
    }, [selectedTab]);

    const handleItemClick = (path: string) => {
        const tabPath = selectedTab.toLowerCase().replace(/\s+/g, "-");
        router.push(`${basePath}/${tabPath}/${path}`);
    };

    return (
        <div className="mb-10 md:mb-20">
            <header className="mb-6">
                <h1 className="text-xl md:text-3xl font-extrabold text-navy">{title}</h1>
            </header>
            <div className="mb-6">
                <Tabs value={selectedTab} onChange={(value) => value && setSelectedTab(value)}>
                    <Tabs.List className="relative flex flex-col md:flex-row border-b-2 border-card-border space-x-7 text-lg md:text-xl">
                        {tabsList.map((tab) => (
                            <Tabs.Tab
                                key={tab}
                                value={tab}
                                className={`text-start py-3 text-lg transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${selectedTab === tab ? "border-b-4 border-orange font-bold text-navy" : "text-body-gray"
                                    }`}
                            >
                                {tab}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
            </div>
            <div>
                <div className="flex flex-col w-full h-full justify-center space-y-3 overflow-auto">
                    {tabContent[selectedTab]?.map((item, index) => (
                        <Card key={index} className="flex justify-between items-center px-4 py-3">
                            <span className="text-navy font-medium text-lg">{item.name}</span>
                            <button
                                className="flex items-center shrink-0 rounded-[10px] border-2 border-navy px-5 py-2 text-sm font-bold text-navy transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-navy hover:text-white"
                                onClick={() => handleItemClick(item.path)}
                            >
                                View <AiOutlineArrowRight className="ml-2" />
                            </button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabbedSection;
