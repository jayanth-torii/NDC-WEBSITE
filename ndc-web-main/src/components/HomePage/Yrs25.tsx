import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const Yrs25 = ({data}:any) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-10 md:mb-20 m-auto w-[90%] sm:w-[91%] gap-10">

      {/* Right Container - Image */}
      <Reveal className="w-full md:w-1/2 mb-5 md:mb-0 flex justify-center md:justify-start">
        <div className="overflow-hidden rounded-[18px] border border-card-border shadow-[var(--shadow-card)] w-auto max-w-full md:max-w-[90%]">
          <Image
            src={data.image}
            alt="academic years"
            width={600}
            height={400}
            className="w-auto h-auto object-contain max-w-full md:h-[80%] lg:h-full"
          />
        </div>
      </Reveal>


      {/* Left Container - Heading and Description */}
      <Reveal className="p-3 md:p-0 w-full md:w-1/2 text-left" delay={0.1}>
        <h2 className="text-navy text-2xl md:text-3xl font-extrabold mb-2 md:mb-5 tracking-[-0.5px]">
          {data.title}
        </h2>
        <p className="text-justify text-body-gray leading-relaxed">
          {data.description}
        </p>
      </Reveal>
    </div>
  );
};

export default Yrs25;
