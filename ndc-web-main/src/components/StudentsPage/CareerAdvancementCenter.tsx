import React from "react";

import PlacementPartners from "./PlacementPartners";

const CareerAdvancementCenter = ({data}:any) => {
 
  return (
    <div className="min-h-screen flex flex-col  text-[#003333] md:px-5">
  
      <h1 className="text-2xl md:text-3xl font-bold mb-5">{data.title}</h1>

      <div className="mb-10">
        {data.sections.map((section: any, index: number) => (
          <div key={index}>
            {section.title && (
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            )}
            {section.description && (
              <p className="text-[#0E2455] text-justify mb-3">{section.description}</p>
            )}
            {section.list?.length > 0 && (
              <ul className="list-disc list-outside text-[#0E2455] px-6">
                {section.list.map((item: string, i: number) => (
                  <li key={i} className="text-justify">{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      
      <img src={data.image} alt="Career Advancement Center image" className="object-contain h-[60vh]  align-center  text-center" />

      {/* Placement Partners Carousel */}
      <PlacementPartners images={data.PlacementPartnersImages} />
    </div>
  );
};

export default CareerAdvancementCenter;


 

 

