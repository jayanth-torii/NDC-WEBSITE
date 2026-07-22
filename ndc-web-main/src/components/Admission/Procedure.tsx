"use client";

import React from "react";

const Procedure = ({ data }: { data: any }) => {
  if (!data) return null;

  const { image, title, procedures } = data;

  return (
    <div className="flex flex-col mb-20">
      {/* Application Procedure Section */}
      <div className="text-black mx-auto flex flex-col md:flex-row gap-8 bg-[#F6F6F6] mb-20">
        {/* Left Image Section */}
        <div className="w-full md:w-[35%] flex justify-center items-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover shadow-lg"
          />
        </div>

        {/* Right Text Section */}
        <div className="w-full md:w-[60%] bg-[#F6F6F6] p-6 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003333] mt-3 mb-5">
            {title}
          </h2>

          {procedures?.map((section: any, index: number) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-[#003333] mb-2">
                {section?.title}
              </h3>
              <p className="text-justify  text-[#003333]">
                {section?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Procedure;
