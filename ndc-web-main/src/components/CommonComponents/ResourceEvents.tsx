"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { useRouter } from "next/navigation";
import { AiOutlineArrowRight } from "react-icons/ai";
import Image from "next/image";

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
                <h1 className="text-xl md:text-3xl font-bold text-[#0E2455]">{title}</h1>
            </header>
            <div className="mb-6">
                <Tabs value={selectedTab} onChange={(value) => value && setSelectedTab(value)}>
                    <Tabs.List className="relative flex flex-col md:flex-row border-b-2 border-[#D9D9D9] space-x-7 text-lg md:text-xl">
                        {tabsList.map((tab) => (
                            <Tabs.Tab
                                key={tab}
                                value={tab}
                                className={`text-start py-3 text-[#003333] text-lg ${selectedTab === tab ? "border-b-4 border-[#F09300] font-bold" : ""
                                    }`}
                            >
                                {tab}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
            </div>
            <div>
                <div className="flex flex-col w-full h-full justify-center space-y-2 overflow-auto">
                    {tabContent[selectedTab]?.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border-b border-[#9E9E9E] px-4 py-3 duration-200"
                        >
                            <span className="text-[#0e2455] font-medium text-lg">{item.name}</span>
                            <button
                                className="flex items-center border px-8 py-2 text-[#0e2455] hover:bg-[#0E2455] hover:text-[white] transition"
                                onClick={() => handleItemClick(item.path)}
                            >
                                View <AiOutlineArrowRight className="ml-2" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabbedSection;
