"use client"

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";


const AboutNDC = ({data} : any) => {
  const {title, subTitle, description, buttonText, image, link} = data

  const router = useRouter();

  return (
    <section className="relative py-10 mb-10">
      <div className="w-[90%] mx-auto px-3 lg:px-0 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Text Section */}
        <Reveal className="order-2 md:order-none lg:w-1/2 mt-0" as="div">
          <h2 className="text-2xl md:text-3xl text-navy font-extrabold leading-tight tracking-[-0.5px]">
            {title}
          </h2>
          <h2 className="mt-5 md:text-lg lg:text-xl text-navy font-semibold leading-relaxed">
            {subTitle}
          </h2>
          {description?.map((text : any, index: any) => (
            <p key={index} className="text-justify mt-5 text-body-gray leading-relaxed">
              {text}
            </p>
          ))}
          <div className="mt-7">
            <Button onClick={() => router.push(link || "/about-ndc")} variant="primary">
              {buttonText}
            </Button>
          </div>
        </Reveal>

        {/* Image Section */}
        <Reveal className="order-1 md:order-none lg:w-1/2 flex justify-center mb-0" delay={0.1}>
          <div className="w-full overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)]">
            <Image
              src={image}
              alt="about"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutNDC;
