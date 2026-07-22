"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";

import About from "@/components/Activities/CommonComponents/About";
import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import { BASE_URL } from "@/config/apiService";

function SCSTOBCMinorityCell() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/sc-st-obc-minority-cell`)
      .then((res) => {
        setData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch sc-st-obc-minority-cell content:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading SC/ST/OBC Minority Cell...
      </div>
    );
  }

  return (
    <div className="m-auto w-[90%]">
      <Banner data={data.bannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <AntiragginCommitte data={data.SCSTCommitteeMembers} />
    </div>
  );
}

export default SCSTOBCMinorityCell;
