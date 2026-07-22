// "use client"

// import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// import { HomePageContent } from "@/app/Data/HomePageContent";
// const {title, subTitle, description, buttonText, image} = HomePageContent.AboutNcetSection;

// const AboutNCET = () => {

//   const router = useRouter();
//   const handleButtonClick = () => {
//     router.push("/about-us");
//   };

//   return (
//     <section className="relative w-[91%] m-auto  mb-10 md:mb-20">
//       <div className=" lg:px-0 flex flex-col lg:flex-row items-center gap-10">
//         {/* Text Section */}
//         <div className="order-2 md:order-none lg:w-1/2 mt-0">
//           <h2 className="text-2xl md:text-3xl text-[#0E2455] font-bold leading-tight">
//             {title}
//           </h2>
//           <h2 className="mt-5  text-[#0E2455] font-semibold leading-relaxed">
//             {subTitle}
//           </h2>
//           {description.map((text, index) => (
//             <p key={index} className="text-justify mt-5 text-gray-700 leading-relaxed">
//               {text}
//             </p>
//           ))}
//           <button onClick={handleButtonClick} className="cursor-pointer mt-7 bg-[#0E2455] hover:bg-blue-700 text-white font-semibold text-base px-8 md:px-10 py-3 md:py-4 rounded-lg">
//             {buttonText}
//           </button>
//         </div>  

//         {/* Image Section */}
//         <div className="order-1 md:order-none lg:w-1/2 flex justify-center mb-0">
//           <div className="w-full">
//             <Image
//               src={image}
//               alt="About NCET"
//               width="1000"
//               height="700"
//               className="rounded-lg w-full h-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutNCET;
