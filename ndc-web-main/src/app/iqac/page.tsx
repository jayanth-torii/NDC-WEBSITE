"use client";

import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import IqacBanner from "@/components/IQAC/IqacBanner";
import About from "@/components/IQAC/About";
import CompositionCell from "@/components/IQAC/CompositionCell";
import { BASE_URL } from "@/config/apiService";

function IQAC() {
  const [iqacData, setIqacData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchIQACContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/iqac`);
        setIqacData(response?.data?.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching IQAC data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIQACContent();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading IQAC...
      </div>
    );
  }

  if (error || !iqacData) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load IQAC content.
      </div>
    );
  }

  return (
    <div className="m-auto w-[90%]">
      <IqacBanner data={iqacData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <About data={iqacData.AboutVisionMissionSections} />

      <CompositionCell data={iqacData.CompositionOfIQACCell} />
    </div>
  );
}

export default IQAC;
