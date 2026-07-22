"use client";

import React from "react";

const ContactDetails = ({ contactDetails }: any) => {
  if (!contactDetails) {
    console.error("contactDetails is undefined");
    return <p>Loading contact details...</p>;
  }

  return (
    <div className="min-h-screen text-black mx-auto flex flex-col md:flex-row gap-6 bg-[#F6F6F6] mb-20">
      {/* Left Image Section */}
      <div className="w-full md:w-[30%] flex justify-center items-center">
        <img
          src={contactDetails.image}
          alt="Contact Us"
          className="w-full h-full object-cover shadow-lg"
        />
      </div>

      {/* Right Container */}
      <div className="w-full md:w-[70%] bg-[#F6F6F6] p-6 flex flex-col justify-center">
        {contactDetails.details.map((section: any, index: number) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-bold text-[#003333] mb-2">{section.title}</h2>
            {section.points.map((point: string, subIndex: number) => (
              <p key={subIndex} className="text-[#003333] text-lg leading-relaxed">
                {point}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;
