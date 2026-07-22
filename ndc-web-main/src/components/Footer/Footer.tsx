"use client";
import React, { useEffect, useState, type ReactElement } from "react";
import { IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import { FaLinkedin, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import logo from "/public/images/footer_logo.png";
// import { FooterContent } from "../../app/Data/Footer";
import axios from "axios";
import { BASE_URL } from "@/config/apiService";
import PdfModal from "../PdfModal";
// import { event } from "@/lib/gtag";


const socialIcons: Record<string, ReactElement> = {
  LinkedIn: <FaLinkedin />,
  Facebook: <FaFacebookF />,
  Instagram: <FaInstagram />,
  Youtube: <FaYoutube />,
};

const Footer = () => {

  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [footerData, setFooterData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchPlacementContent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/footer`);
        console.log(response?.data?.data)
        setFooterData(response?.data.data);
      } catch (error) {
        console.error("Error fetching Placement sections:", error);
      }
    };

    fetchPlacementContent();
  }, []);

  const openPdf = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };

  const closePdf = () => {
    setSelectedPdf(null);
  };

  return (
    <footer className="bg-[#0E2455] text-white text-sm md:text-base">

      {/* footer Top link section */}
      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 px-4  py-8  md:px-10 lg:px-20 md:py-16">
        {/* Logo and Contact + Important Links Side by Side in Mobile */}
        <div className="relative flex flex-col md:items-start md:gap-6 md:ml-0 md:col-span-2 mb-10">
          {/* Logo at left */}

          {
            footerData?.contactInfo?.logo &&
             <Image
            src={footerData?.contactInfo?.logo }
            alt="NGI Logo"
            width={200}
            height={50}
            className="aspect-[4/3] self-center md:self-auto relative mb-4 md:mb-0"
          />
          }
         

          {/* Content at right of logo but aligned left */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-semibold text-lg mt-3">CONTACT US AT</h3>

            <div className="mt-2">
              <p className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <IconPhone size={16} />
                <a href={`tel:${footerData?.contactInfo?.phone || ''}`} className="hover:underline">
                  {footerData?.contactInfo?.phone}
                </a>
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <IconMail size={16} />
                <a href={`mailto:${footerData?.contactInfo?.email || ''}`} className="hover:underline">
                  {footerData?.contactInfo?.email}
                </a>
              </p>
              <p className="flex items-start gap-2 justify-center md:justify-start mb-1">
                <IconMapPin size={35} />
                <a
                  href={footerData?.contactInfo?.address_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {footerData?.contactInfo?.address}
                </a>
              </p>

              {/* Follow Us - Only visible on small screens */}
              <div className="block md:hidden text-center mt-6">
                <h3 className="font-semibold text-lg">FOLLOW US ON</h3>
                <div className="flex justify-center gap-3 mt-2">
                  {footerData?.follow &&
                    footerData?.follow.map(({ title, link }: any) => (
                      <a
                        key={title}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300 text-2xl"
                      >
                        {socialIcons[title] || title}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* IMPORTANT LINKS SECTION */}
        <div className="flex flex-col items-center md:items-start md:col-span-1 mb-4">
          <h3 className="font-semibold text-lg text-center md:text-left">IMPORTANT LINKS</h3>
          <ul className="mt-2 space-y-1 text-center md:text-left">
            {/* Static Start*/}
             
            {/* Static End*/}
            {footerData?.importantLinks && footerData?.importantLinks.map(({ title, link, type, pdf_link }: any) => (
              <li key={title}>
                {type === "pdf" ? (
                  <a
                    role="button"
                    onClick={() => {
  // event({
  //   action: "click",
  //   category: "Footer PDF",
  //   label: title,
  //   value: pdf_link,
  // });
  // openPdf(pdf_link);
}}
                    className="hover:underline cursor-pointer"
                  >
                    {title}
                  </a>
                ) : (
                  <a href={link} className="hover:underline">
                    {title}
                  </a>
                )}
              </li>
            ))}
            {/* Dynamic End*/}
          </ul>
        </div>

        {/* ACADEMICS SECTION */}
        <div className="flex flex-col items-center md:items-start md:col-span-1 mb-4">
          <h3 className="font-semibold text-lg text-center md:text-left">ACADEMICS</h3>
          <ul className="mt-2 space-y-1 text-center md:text-left">
            {/* Static Start*/}
 
            {/* Static End*/}
            {/* Dynamic Start*/}
            {footerData?.acadamics && footerData?.acadamics.map(({ title, link, type, pdf_link }: any) => (
              <li key={title}>
                {type === "pdf" ? (
                  <a
                    role="button"
                    onClick={() => openPdf(pdf_link)}
                    className="hover:underline cursor-pointer"
                  >
                    {title}
                  </a>
                ) : (
                  <a href={link} className="hover:underline">
                    {title}
                  </a>
                )}
              </li>
            ))}
            {/* Dynamic End*/}
          </ul>
        </div>

        {/* RESEARCH SECTION */}
        <div className="flex flex-col items-center md:items-start md:col-span-1 mb-4">
          <h3 className="font-semibold text-lg text-center md:text-left">REPORTS & PUBLICATIONS</h3>
          <ul className="mt-2 space-y-1 text-center md:text-left">
            {/* Static Start*/}
 
            {/* Static End*/}
            {/* Dynamic Start*/}
            {footerData?.reports_and_publications && footerData?.reports_and_publications.map(({ title, link, type, pdf_link }: any) => (
              <li key={title}>
                {type === "pdf" ? (
                  <a
                    role="button"
                    onClick={() => openPdf(pdf_link)}
                    className="hover:underline cursor-pointer"
                  >
                    {title}
                  </a>
                ) : (
                  <a href={link} className="hover:underline">
                    {title}
                  </a>
                )}
              </li>
            ))}
            {/* Dynamic End*/}
          </ul>
        </div>

        {/* POLICIES SECTION */}
        <div className="flex flex-col items-center md:items-start md:col-span-1 mb-4">
          <h3 className="font-semibold text-lg text-center md:text-left">POLICIES & GUIDELINES</h3>
          <ul className="mt-2 space-y-1 text-center md:text-left">
            {/* Static Start*/}
 
            {/* Static End*/}
            {/* Dynamic Start*/}
            {footerData?.policies && footerData?.policies.map(({ title, link, type, pdf_link }: any) => (
              <li key={title}>
                {type === "pdf" ? (
                  <a
                    role="button"
                    onClick={() => openPdf(pdf_link)}
                    className="hover:underline cursor-pointer"
                  >
                    {title}
                  </a>
                ) : (
                  <a href={link} className="hover:underline">
                    {title}
                  </a>
                )}
              </li>
            ))}
            {/* Dynamic End*/}
          </ul>
        </div>
      </div>



      {/* footer Copyright Section - Column on Mobile, Row on Medium and Large */}
      <div className="bg-[#F6872A] py-4 md:py-6 mt-6 md:px-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <p className="p-2">{footerData?.contactInfo?.rights_reserved}</p>
          <div className="hidden md:flex gap-2 mt-4 md:mt-0 items-center">
            <h3 className="font-semibold">FOLLOW US ON</h3>
            {/* Dynamic Start*/}
            {footerData?.follow && footerData?.follow.map(({ title, link }: any) => (
              <a
                key={title}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 text-2xl"
              >
                {socialIcons[title] || title} {/* Fallback text in case an icon is missing */}
              </a>
            ))}
            {/* Dynamic End*/}
          </div>
          {/* <p className="text-xs md:text-lg mt-4 md:mt-0">DESIGNED & DEVELOPED BY KOGNITOKUBE PVT LTD</p> */}
        </div>
      </div>

      {/* PDF Modal Popup */}
      <PdfModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />

    </footer>
  );
};

export default Footer;

