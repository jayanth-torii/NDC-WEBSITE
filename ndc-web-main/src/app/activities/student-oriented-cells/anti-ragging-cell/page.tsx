"use client";
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

import Banner from "@/components/Activities/CommonComponents/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import About from "@/components/Activities/CommonComponents/About";
import Policies from "@/components/Activities/CommonComponents/Policies";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";

function AntiRaggingCell() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/anti-ragging-cell`)
      .then((res) => {
        const content = res?.data?.data;
        setData(content || null);
      })
      .catch((err) => {
        console.error("Failed to fetch anti-ragging content:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading Anti-Ragging Cell...
      </div>
    );
  }

  return (
    <div className="m-auto w-[90%]">
      <Banner data={data.bannerSection} />
      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>
      <About data={data.aboutSections} />
      <Policies data={data.policyAndConsiderations} />
      <AntiragginCommitte data={data.antiRaggingCommitteMembers} />
    </div>
  );
}

export default AntiRaggingCell;
