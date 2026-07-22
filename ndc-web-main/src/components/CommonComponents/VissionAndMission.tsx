"use client";

import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface SectionData {
    title: string;
    description?: string;
    points?: string[];
}

interface InfoSectionProps {
    sections: {
        vision: SectionData;
        mission: SectionData;
        collapsibleSections?: { [key: string]: SectionData };
    };
}

const InfoSection: React.FC<InfoSectionProps> = ({ sections }) => {
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section], // Toggle specific section
        }));
    };

    return (
        <div className="mb-10 md:mb-20 text-[#003333]">
            {/* Vision Section */}
            <div className="bg-[#F6F6F6] p-6 mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{sections.vision.title}</h2>
                {sections.vision.description && (
                    <p className="text-base md:text-lg">{sections.vision.description}</p>
                )}
            </div>

            {/* Mission Section */}
            <div className="bg-[#F6F6F6] p-6 mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{sections.mission.title}</h2>
                {sections.mission.points && (
                    <ul className="list-disc pl-6 text-[#003333] text-base md:text-lg">
                        {sections.mission.points.map((point, index) => (
                            <li key={index} className="mb-2">{point}</li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Collapsible Sections (Objectives, Functions, etc.) */}
            {sections.collapsibleSections &&
                Object.entries(sections.collapsibleSections).map(([key, section]) => (
                    <div key={key} className="bg-white mb-4 overflow-hidden">
                        <button
                            onClick={() => toggleSection(key)}
                            className="w-full flex justify-between items-center p-4 bg-[#f6f6f6] text-lg font-semibold text-[#0E2455]"
                        >
                            {section.title}
                            {openSections[key] ? <AiOutlineUp className="text-xl" /> : <AiOutlineDown className="text-xl" />}
                        </button>
                        {openSections[key] && section.points && (
                            <div className="p-4 bg-[#f6f6f6]">
                                <ul className="list-disc pl-6 text-[#003333] text-base md:text-lg">
                                    {section.points.map((point, index) => (
                                        <li key={index} className="mb-2">{point}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default InfoSection;
