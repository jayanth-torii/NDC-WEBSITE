import Image from "next/image";

const Yrs25 = ({data}:any) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-10 md:mb-20 m-auto w-[90%] sm:w-[91%] ">

      {/* Right Container - Image */}
      <div className="w-full md:w-1/2 mb-5 md:mb-0 flex justify-center md:justify-start">
        <Image
          src={data.image}
          alt="academic years"
          width={600}
          height={400}
          className="rounded-lg   w-auto h-auto object-contain max-w-full md:h-[80%] lg:h-full md:max-w-[90%]"
        />
      </div>

      
      {/* Left Container - Heading and Description */}
      <div className="p-3 md:p-0 w-full md:w-1/2 text-left">
        <h2 className="text-[#0E2455] text-2xl md:text-3xl font-bold mb-2 md:mb-5">
        {data.title}
        </h2>
        <p className="text-justify text-[#434554] leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default Yrs25;