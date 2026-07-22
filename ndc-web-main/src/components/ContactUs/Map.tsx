import React from "react";
import Image from "next/image";
import { Navigation } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const Map = ({ mapData }: any) => {
  const { BannerMap, AdderssMAP, MapLink } = mapData;

  return (
    <div>
      <SectionHeading eyebrow="Find Us" title="Visit Our Campus" align="center" className="mb-10" />

      <Reveal>
        <div className="relative w-full overflow-hidden rounded-[24px] border border-card-border shadow-[var(--shadow-card)]">
          <div
            className="relative h-[40vh] w-full bg-cover bg-center sm:h-[50vh] lg:h-[60vh]"
            style={{ backgroundImage: `url(${BannerMap})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/0 to-transparent" />

            {AdderssMAP && (
              <div className="absolute left-4 top-4 hidden sm:block sm:left-6 sm:top-6">
                <Image
                  className="rounded-[14px] border border-white/20 shadow-[var(--shadow-card-hover)]"
                  src={AdderssMAP}
                  alt="Campus location"
                  width={280}
                  height={210}
                  priority
                />
              </div>
            )}

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold text-white/90 sm:text-base">
                Nagarjuna Degree College, Yelahanka, Bengaluru
              </p>
              <Button variant="primary" href={MapLink} external>
                <Navigation size={18} />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Map;
