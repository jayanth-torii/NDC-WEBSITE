import React from "react";
import Image from "next/image";
import { Paper } from "@mantine/core";
import { useRouter } from "next/navigation";

const Map = ({mapData}:any) => {
  const { BannerMap, AdderssMAP, MapLink } = mapData;

    const router = useRouter();
    const handlemapClick = () => {
      router.push(MapLink);
    };

  return (
    <div className="relative w-full overflow-hidden mb-40">
      <Paper className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"  onClick={handlemapClick}
          style={{ backgroundImage: `url(${BannerMap})` }}
        />

        {/* Foreground Image positioned at top-left */}
        <div className="absolute top-0 left-0 m-6">
          <a href={MapLink} target="_blank" rel="noopener noreferrer">
            <Image
              className="rounded-xl shadow-lg"
              src={AdderssMAP}
              alt="Campus Map"
              width={400} 
              height={300}
              priority
            />
          </a>
        </div>
      </Paper>
    </div>
  );
};

export default Map;
