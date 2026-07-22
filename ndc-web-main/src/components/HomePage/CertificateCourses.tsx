"use client"

import React from "react";
import { useRouter } from "next/navigation";

const CertificateCourses = ({data}:any) => {
  const {title, image, link} = data;

    const router = useRouter();

    return (
      <div className="md:mt-10 flex justify-center items-center w-full cursor-pointer mb-10 md:mb-20" onClick={() => router.push(link)}>
        <img
            src={image}
            alt="Education Image"
            className="h-full max-h-[600px] md:max-h-[800px] lg:max-h-[1000px] w-auto"
        />
     </div>
    )
}

export default CertificateCourses