"use client";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Reveal } from "@/components/ui/Reveal";
import "./about-ndc.css";

const PrincipalMessage = ({ data }: { data: any }) => {
  if (!data) return null;

  const { title, image, principalName, position, message } = data;

  return (
    <section className="py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <Reveal>
          <div className="abt-pr">
            <div className="abt-pr__media">
              <img src={image} alt={principalName} />
            </div>
            <div className="abt-pr__body">
              <span className="abt-pr__eyebrow">{title}</span>
              <span className="abt-pr__quote-mark"><FaQuoteLeft /></span>
              
              {message?.map((each: string, index: number) => (
                <p key={index} className="abt-pr__text">
                  {each}
                </p>
              ))}
              
              <p className="abt-pr__sign">— {principalName}<span>{position}</span></p>
            </div>
            <span className="abt-pr__dots" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PrincipalMessage;
