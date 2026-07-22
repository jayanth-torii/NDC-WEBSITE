"use client";
import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface InfoSectionProps {
    aboutSections?: { title: string, description: string }[];
    vision?: { title: string; description: string };
    mission?: { title: string; points: string[] };
    collapsibleSections?: { [key: string]: { title: string; points: string[] } };
}

const InfoSection: React.FC<InfoSectionProps> = ({
    
    aboutSections,
    vision,
    mission,
    collapsibleSections,
}) => {
    const [openSections, setOpenSections] = useState<string[]>([]);

    const toggleSection = (section: string) => {
        setOpenSections((prev) =>
            prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
        );
    };

    return (
        <div className="mb-10 md:mb-20">
            {aboutSections?.map((section, index) => (
                <div key={index} className="bg-[#F6F6F6] p-6 mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-[#0E2455] mb-4 whitespace-pre-wrap">
                        {section.title}
                    </h2>
                    <p className="text-[#003333] md:text-lg">{section.description.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}</p>
                </div>
            ))}
            {(vision || mission) && (
                <div className="mb-4 overflow-hidden">
                    <button
                        onClick={() => toggleSection("visionMission")}
                        className="w-full flex justify-between items-center p-4 bg-[#F6F6F6] text-lg text-[#0E2455]"
                    >
                        Vision & Mission
                        {openSections.includes("visionMission") ? (
                            <AiOutlineUp className="text-xl" />
                        ) : (
                            <AiOutlineDown className="text-xl" />
                        )}
                    </button>
                    {openSections.includes("visionMission") && (
                        <div className="p-6 bg-[#F6F6F6]">
                            {vision && (
                                <>
                                    <h3 className="text-xl font-semibold text-[#0E2455] mb-2">{vision.title}</h3>
                                    <p className="text-[#003333] md:text-lg mb-4">{vision.description}</p>
                                </>
                            )}
                            {mission && (
                                <>
                                    <h3 className="text-xl font-semibold text-[#0E2455] mb-2">{mission.title}</h3>
                                    <ul className="list-disc pl-6 text-[#003333] md:text-lg">
                                        {mission.points.map((point, index) => (
                                            <li key={index} className="mb-2">{point}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
            {collapsibleSections &&
                Object.entries(collapsibleSections).map(([key, section]) => (
                    <div key={key} className="mb-4 overflow-hidden">
                        <button
                            onClick={() => toggleSection(key)}
                            className="w-full flex justify-between items-center p-4 bg-[#f6f6f6] text-lg text-[#0E2455]"
                        >
                            {section.title}
                            {openSections.includes(key) ? (
                                <AiOutlineUp className="text-xl" />
                            ) : (
                                <AiOutlineDown className="text-xl" />
                            )}
                        </button>
                        {openSections.includes(key) && (
                            <div className="p-4 bg-[#f6f6f6]">
                                <ul className="list-disc pl-6 text-[#003333] md:text-lg">
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
