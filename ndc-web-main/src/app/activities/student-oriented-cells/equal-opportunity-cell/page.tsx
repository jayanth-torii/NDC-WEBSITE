"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";

import About from "@/components/Activities/CommonComponents/About";
import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

import { BASE_URL } from "@/config/apiService";

function EqualOpportunityCell() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/equal-opportunity-cell`)
      .then((res) => {
        setData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error("Failed to fetch equal-opportunity-cell content:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Equal Opportunity Cell...
      </div>
    );
  }

  return (
    <div className="m-auto w-[90%]">
      <Banner data={data.bannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <About data={data.AboutVisionMissionSections} />

      <AntiragginCommitte data={data.Table} />
    </div>
  );
}

export default EqualOpportunityCell;
