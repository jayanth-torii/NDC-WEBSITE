import React from "react";
import Image from "next/image";

export default function Contact({data}:any) {

  if (!data) {
    return null
  }
  const {title, description, image} = data;

  return (

      <div className="mb-10 flex flex-col items-center gap-6 rounded-[18px] border border-card-border bg-white p-6 shadow-[var(--shadow-card)] md:mb-16 md:flex-row">
        {/* Text Section */}
        <div className="h-74 w-full space-y-4 p-4 md:h-80 md:w-[50%]">
          <h2 className="text-2xl font-extrabold tracking-[-0.5px] text-navy md:text-3xl">{title}</h2>
          {
            description?.map((each:any, id:any) => (
                <p key={id} className="mb-2 text-body-gray"><span className="font-semibold text-navy">{id+1}. </span> {each}</p>
            ))
          }
        </div>

        {/* Image Section */}
        {image && (
          <div className="relative h-64 w-full overflow-hidden rounded-[14px] md:h-80 md:w-[50%]">
              <Image src={image} alt="Policy Image" fill className="object-cover" />
          </div>
        )}

      </div>

  );
}
