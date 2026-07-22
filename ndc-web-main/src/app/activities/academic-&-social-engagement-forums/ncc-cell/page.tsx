"use client";
import React, { Suspense, useEffect, useState } from "react";

import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Procedure from "@/components/Activities/CommonComponents/Procedure";
import Images from "@/components/Activities/CommonComponents/Images";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import axios from "axios";
import { BASE_URL } from "@/config/apiService";

function NCCCell() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/ncc`)
      .then((res) => {
        setData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch NCC content:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading NCC Cell...
      </div>
    );
  }

  return (
    <div className="m-auto w-[90%]">
    
      <Banner data={data.bannerSection} />

     
      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

    
      <Procedure data={data.Sections} />

     
      {data?.NccImage && (
        <div className="bg-[#F6F6F6] rounded-md p-6 mb-10 md:mb-20">
          <img
            src={data.NccImage}
            alt="NCC Cadet"
            className="m-auto w-[50%] h-auto object-contain"
          />
        </div>
      )}

     
      <Images data={data.ImagesSection} />

     
      <AntiragginCommitte data={data.CommitteMembers} />
    </div>
  );
}

export default NCCCell;
