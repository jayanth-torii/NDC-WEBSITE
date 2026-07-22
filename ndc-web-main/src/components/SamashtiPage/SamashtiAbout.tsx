"use client";

import Card from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const SamashtiAbout = ( { data }  :any) => {
  const {title, description}  = data
  return (
    <Reveal className="mb-10">
      <Card className="p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy">
          {title}
        </h2>
        <div className="mt-6 space-y-5 md:space-y-8">
          {description?.map((paragraph:string, index:number) => (
            <p key={index} className="text-justify leading-relaxed text-body-gray">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>
    </Reveal>
  );
};

export default SamashtiAbout;
