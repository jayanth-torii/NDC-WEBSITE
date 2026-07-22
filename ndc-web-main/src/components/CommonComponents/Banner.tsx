"use client";

import React from "react";
import Image from "next/image";
import { Paper } from "@mantine/core";

interface BannerProps {
    imagePath: string;
}

const Banner: React.FC<BannerProps> = ({ imagePath }) => {
    return (
        <div className="relative w-full overflow-hidden my-10 md:my-20">
            <Paper className="relative w-full h-[30vh] md:h-[50vh] lg:h-[70vh] overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
                <div className="absolute inset-0">
                    <Image
                        src={imagePath}
                        alt="banner"
                        layout="fill"
                        priority
                        className="rounded-[18px] object-fill"
                    />
                </div>
            </Paper>
        </div>
    );
};

export default Banner;
