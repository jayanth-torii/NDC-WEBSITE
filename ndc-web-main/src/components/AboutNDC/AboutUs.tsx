import Image from "next/image";

const AboutUs = ({ data }: { data: any }) => {
  const { title, description, image } = data;

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:mt-20 mb-20">
      {/* Right Container - Image */}
      <div className="md:w-1/3 flex justify-center order-first md:order-last mb-8 md:mb-2">
        <Image
          src={image}
          alt="About Us Image"
          width={600}
          height={400}
          className="rounded-lg"
        />
      </div>

      {/* Left Container - Heading and Description */}
      <div className="md:w-2/3 text-left">
        <h2 className="text-[#0E2455] text-2xl md:text-3xl font-bold md:underline decoration-[#FFB300] mb-4 md:mb-10">
          {title}
        </h2>

        {description?.map((each: string, index: number) => (
          <p
            key={index}
            className="text-justify text-[#0E2455] leading-relaxed mb-5"
          >
            {each}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
