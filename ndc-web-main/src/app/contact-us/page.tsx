"use client";

import React, { Suspense } from "react";
import { Box } from "@mantine/core";
import pageJson from "@/data-export/contact-us/data.json";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ContactUsBanner from "@/components/ContactUs/ContactUsBanner";
import ContactDetails from "@/components/ContactUs/ContactDetails";
import QueryForm from "@/components/ContactUs/QueryForm";
import Map from "@/components/ContactUs/Map";
import LoginPortals from "@/components/ContactUs/LoginPortals";

const ContactUs = () => {
  const contactUsData: any = (pageJson["contact-us"] as any)?.data || null;

  if (!contactUsData) {
    return null;
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
