"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

 
const Education = ({ data } :any) => {

  const { title , description , subTitle, image, buttons} = data || {};
  const router = useRouter();

  return (
    <>

      {/* Education Programmes Section */}
      <div className="w-full">
        {/* Large and Medium Screens */}
        <div className="hidden sm:flex flex-row items-center justify-between px-6 lg:px-16 py-10 gap-6">
          <div className="lg:w-1/2 w-[40%] text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#132144]">{title}</h2>
            <p className="mt-6 text-[#003333] w-full md:w-[90%] lg:w-[65%]">
              {description}
            </p>
            <p className="mt-2 font-semibold text-lg text-[#003333]">{subTitle}</p>
            {buttons.length > 0 && (
              <div className="mt-6 flex gap-4">
                {buttons.map((btn: any, index: number) => (
                  <button
                    onClick={() => router.push(`/departments#${btn.url}`)}
                    key={index}
                    className="cursor-pointer lg:self-start font-medium py-1 px-3 rounded-small shadow-md transition-all border-2 border-[#132144]  bg-[#132144] text-white hover:bg-[white] hover:text-[#132144]"
                  >
                    {btn.title}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-[60%] lg:w-1/2">
            {image && (
              <Image src={image} alt="Education Programme" className="w-full h-auto" width={800} height={600} />
            )}
          </div>
        </div>

        {/* Small Screens */}
        <div className="sm:hidden flex flex-col items-center justify-center mt-5 px-4 py-8 text-center">
          <h2 className="text-2xl text-start w-full font-bold text-[#132144]">{title}</h2>
          <p className="text-justify text-[#003333] md:text-lg lg:text-xl w-full md:w-[90%] lg:w-[65%]">
            {description}
          </p>
          <p className="mt-2 text-start font-semibold md:text-lg lg:text-xl w-full text-[#003333]">{subTitle}</p>
          <div className="mb-6 mt-4 w-full">
             {image && (
              <Image src={image} alt="Education Programme" className="w-full h-auto" width={800} height={600} priority />
             )}
          </div>
          {buttons.length > 0 && (
            <div className="mt-4 flex flex-row gap-3 w-full">
              {buttons.map((btn: any, index: number) => (
                <button
                  onClick={() => router.push(`/departments#${btn.url}`)}
                  key={index}
                  className="cursor-pointer font-small py-1 px-1 rounded-lg shadow-md transition-all w-full border-2 border-[#132144]  bg-[#132144] text-white hover:bg-[white] hover:text-[#132144]"
                >
                  {btn.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Education;