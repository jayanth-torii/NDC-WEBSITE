"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";


const Education = ({ data } :any) => {

  const { title , description , subTitle, image, buttons} = data || {};
  const router = useRouter();

  return (
    <>

      {/* Education Programmes Section */}
      <div className="w-full">
        {/* Large and Medium Screens */}
        <Reveal className="hidden sm:flex flex-row items-center justify-between px-6 lg:px-16 py-10 gap-6">
          <div className="lg:w-1/2 w-[40%] text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.5px]">{title}</h2>
            <p className="mt-6 text-body-gray leading-relaxed w-full md:w-[90%] lg:w-[65%]">
              {description}
            </p>
            <p className="mt-2 font-semibold text-lg text-navy">{subTitle}</p>
            {buttons.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                {buttons.map((btn: any, index: number) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => router.push(`/departments#${btn.url}`)}
                    className="!px-5 !py-2.5 !text-sm lg:self-start"
                  >
                    {btn.title}
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-[60%] lg:w-1/2 overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
            {image && (
              <Image src={image} alt="Education Programme" className="w-full h-auto" width={800} height={600} />
            )}
          </div>
        </Reveal>

        {/* Small Screens */}
        <Reveal className="sm:hidden flex flex-col items-center justify-center mt-5 px-4 py-8 text-center">
          <h2 className="text-2xl text-start w-full font-extrabold text-navy tracking-[-0.5px]">{title}</h2>
          <p className="text-justify text-body-gray leading-relaxed w-full md:w-[90%] lg:w-[65%]">
            {description}
          </p>
          <p className="mt-2 text-start font-semibold w-full text-navy">{subTitle}</p>
          <div className="mb-6 mt-4 w-full overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
             {image && (
              <Image src={image} alt="Education Programme" className="w-full h-auto" width={800} height={600} priority />
             )}
          </div>
          {buttons.length > 0 && (
            <div className="mt-4 flex flex-row gap-3 w-full">
              {buttons.map((btn: any, index: number) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => router.push(`/departments#${btn.url}`)}
                  className="!px-1 !py-2 !text-sm w-full"
                >
                  {btn.title}
                </Button>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </>
  );
};

export default Education;
