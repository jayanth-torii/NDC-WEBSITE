import Image from "next/image";


const HodMessage = ({data} :any) => {
  const {title, image, name, position, message} = data
  return (
    <section className="container mb-8 md:mb-20">
      <div className="bg-white p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0E2455] text-center md:text-left mb-10">{title}</h1> 
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left Container (Image) */}
          <div className="w-full md:w-1/3 flex justify-center">
            <Image 
              src={image} 
              alt="Principal" 
              width={500} 
              height={500} 
              className="rounded-lg"
            />
          </div>
          
          {/* Right Container (Text Content) */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-xl lg:text-2xl font-semibold mb-3 text-left">{name}</h2>
            <p className="text-[#0E2455] font-semibold text-left text-xl mb-5">{position}</p>
            {message.map((each:any , index:any) => (
              <p key={index} className="text-justify mt-4 text-[#0E2455] leading-relaxed mb-4"> {each} </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HodMessage;
