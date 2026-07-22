"use client";

import React from "react";
import pageJson from "@/data-export/contact-us/data.json";

import GlobalBanner from "@/components/GlobalBanner";
import ContactDetails from "@/components/ContactUs/ContactDetails";
import QueryForm from "@/components/ContactUs/QueryForm";
import Map from "@/components/ContactUs/Map";
import LoginPortals from "@/components/ContactUs/LoginPortals";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const ContactUs = () => {
  const contactUsData: any = (pageJson["contact-us"] as any)?.data || null;

  if (!contactUsData) {
    return null;
  }

  // Use MapLink to construct embed URL if possible, otherwise rely on the Map component
  const mapUrl = contactUsData.MAP?.MapLink || "#";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <GlobalBanner
        title={contactUsData.BannerSection?.title || "Contact Us"}
        image={contactUsData.BannerSection?.image}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Contact Us" }
        ]}
      />

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20 items-start">
            {/* Info rail */}
            <div className="lg:col-span-5">
              <ContactDetails 
                contactDetails={contactUsData.contactDetails} 
                mapUrl={mapUrl} 
              />
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <RevealGroup>
                <RevealItem>
                  <QueryForm />
                </RevealItem>
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Map mapData={contactUsData.MAP} />
        </div>
      </section>

      {/* Login Portals */}
      <section className="pb-20 lg:pb-24 bg-gray-50 pt-20">
        <div className="container mx-auto px-4 lg:px-8">
          <LoginPortals portals={contactUsData.LoginPortals} />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
