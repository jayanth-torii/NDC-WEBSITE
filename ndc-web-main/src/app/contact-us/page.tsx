"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mantine/core";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ContactUsBanner from "@/components/ContactUs/ContactUsBanner";
import ContactDetails from "@/components/ContactUs/ContactDetails";
import QueryForm from "@/components/ContactUs/QueryForm";
import Map from "@/components/ContactUs/Map";
import LoginPortals from "@/components/ContactUs/LoginPortals";

const ContactUs = () => {
  const [contactUsData, setContactUsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactUsContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/contact-us`);
        setContactUsData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching contact us data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactUsContent();
  }, []);

  if (loading || !contactUsData) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading ContactUs...
      </div>
    );
  }

  return (
    <Box style={{ margin: "auto", width: "90%" }}>
      <ContactUsBanner bannerData={contactUsData.BannerSection} />

      <Suspense>
        <Breadcrumb className="ml-0" />
      </Suspense>

      <ContactDetails contactDetails={contactUsData.contactDetails} />

      <LoginPortals portals={contactUsData.LoginPortals} />

      <QueryForm />

      <Map mapData={contactUsData.MAP} />
    </Box>
  );
};

export default ContactUs;
