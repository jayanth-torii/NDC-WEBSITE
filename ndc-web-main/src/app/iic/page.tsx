"use client";

import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";

 
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import IICBanner from "@/components/IIC/IICBanner";
import IICMembers from "@/components/IIC/IICMembers";

import { BASE_URL } from "@/config/apiService";


function IIC() {
  const [IICData, setIICData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchIQACContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/iic`);
        setIICData(response?.data?.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching IIC data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIQACContent();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading IIC...
      </div>
    );
  }

  if (error || !IICData) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Failed to load IIC content.
      </div>
    );
  }

  return (
    <div className="m-auto w-[90%]">
      <IICBanner data={IICData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <IICMembers data={IICData.IICMembers} />
    </div>
  );
}

export default IIC;
