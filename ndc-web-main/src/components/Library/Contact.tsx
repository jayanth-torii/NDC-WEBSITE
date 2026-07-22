import React from "react";
import Image from "next/image";

// const data = {
//     title: "Contact US",
//     description: ["NIRANJAN R", "KULATHILAK Y U"],
//     image: "/images/library/contact.png",
// }

export default function Contact({data}:any) {
  
  if (!data) {
    return null
  }
  const {title, description, image} = data;

  return (
    
      <div className="items-center gap-6 flex flex-col bg-[#F6F6F6] md:flex-row mb-10 md:mb-16 p-6">
        {/* Text Section */}
        <div className="space-y-4 bg-[#F6F6F6] p-4 h-74 md:h-80 w-full md:w-[50%]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003333]">{title}</h2>
          {
            description?.map((each:any, id:any) => (
                <p key={id} className=" text-[#003333] mb-2"><span>{id+1}. </span> {each}</p>
            ))
          }
        </div>
        
        {/* Image Section */}
        {image && (
          <div className="relative h-64 md:h-80 w-full md:w-[50%]">
              <Image src={image} alt="Policy Image" fill objectFit="cover" />
          </div>
        )}

      </div>
    
  );
}