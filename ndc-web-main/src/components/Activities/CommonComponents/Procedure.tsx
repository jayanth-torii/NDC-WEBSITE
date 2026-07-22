"use client";
import React from "react";
import Card from "@/components/ui/Card";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const Procedure = ({ data }: any) => {
  return (
    <RevealGroup className="mb-10 md:mb-20 space-y-5">
      {data.map((policy: any, index: any) => (
        <RevealItem key={index}>
          <Card accent="orange-left" className="p-5 md:p-6">
            <h1 className="text-xl md:text-2xl font-semibold text-navy mb-3">{policy.title}</h1>

            {policy.descriptions?.map((desc: any, idx: any) => (
              <p key={idx} className="text-justify text-body-gray leading-relaxed mb-2">{desc}</p>
            ))}

            <ul className="space-y-2 list-disc pl-5 marker:text-orange">
              {policy.points?.map((point: any, idx: any) => (
                <li key={idx} className="text-justify text-body-gray">{point}</li>
              ))}
            </ul>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
};

export default Procedure;
