"use client";

const SamashtiAbout = ( { data }  :any) => {
  const {title, description}  = data
  return (
    <div className="bg-gray-100 p-8 rounded-lg mb-10">
      <h2 className="text-2xl md:text-3xl text-[#003333] font-bold">
        {title}
      </h2>
      <div className="mt-6">
        {description?.map((paragraph:string, index:number) => (
          <p key={index} className="text-justify text-[#003333] mb-5 md:mb-10">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SamashtiAbout;
