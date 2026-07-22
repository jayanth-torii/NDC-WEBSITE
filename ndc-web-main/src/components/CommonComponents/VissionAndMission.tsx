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
        <div className="mb-10 md:mb-20 text-body-gray">
            {/* Vision Section */}
            <div className="rounded-[18px] border border-card-border bg-surface-light p-6 mb-6 shadow-[var(--shadow-card)]">
                <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">{sections.vision.title}</h2>
                {sections.vision.description && (
                    <p className="text-base md:text-lg leading-[1.65]">{sections.vision.description}</p>
                )}
            </div>

            {/* Mission Section */}
            <div className="rounded-[18px] border border-card-border bg-surface-light p-6 mb-6 shadow-[var(--shadow-card)]">
                <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">{sections.mission.title}</h2>
                {sections.mission.points && (
                    <ul className="list-disc pl-6 text-body-gray text-base md:text-lg">
                        {sections.mission.points.map((point, index) => (
                            <li key={index} className="mb-2">{point}</li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Collapsible Sections (Objectives, Functions, etc.) */}
            {sections.collapsibleSections &&
                Object.entries(sections.collapsibleSections).map(([key, section]) => (
                    <div key={key} className="bg-white mb-4 overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
                        <button
                            onClick={() => toggleSection(key)}
                            className="w-full flex justify-between items-center p-4 bg-surface-light text-lg font-semibold text-navy transition-colors duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-surface-tint"
                        >
                            {section.title}
                            {openSections[key] ? <AiOutlineUp className="text-xl text-orange" /> : <AiOutlineDown className="text-xl text-orange" />}
                        </button>
                        {openSections[key] && section.points && (
                            <div className="p-4 bg-white">
                                <ul className="list-disc pl-6 text-body-gray text-base md:text-lg">
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
