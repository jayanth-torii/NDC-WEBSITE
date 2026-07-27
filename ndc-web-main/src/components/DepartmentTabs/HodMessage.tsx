import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { useLiveData } from "@/hooks/useLiveData";
import { getDepartmentTab } from "@/services/data.service";

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const HodMessage = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const { data: apiData } = useLiveData(() => getDepartmentTab("/department/hod-message"));

  const content = useMemo(() => {
    let matchedData: any = null;
    Object.keys(apiData).forEach((k) => {
      if (normalizeKey(k) === normalizedProgramme) {
        matchedData = apiData[k];
      }
    });
    return matchedData;
  }, [apiData, normalizedProgramme]);

  useEffect(() => {
    haveContentCheck(content != null);
  }, [content, haveContentCheck]);

  if (!content) return null;

  const { hodImage, hodName, hodDesignation, hodMessage } = content;

  return (
    <Reveal>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* Left Side: Profile */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="relative mb-8 mt-4">
            {/* Rotating dashed ring */}
            <motion.div 
              className="absolute -inset-4 border-2 border-dashed border-orange/40 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
            {/* Inner rotating solid ring */}
            <motion.div 
              className="absolute -inset-2 border-4 border-navy/10 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            />
            
            {/* Floating Image */}
            <motion.div 
              className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white shrink-0 relative z-10 border-[4px] border-white"
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <img
                src={hodImage || "/images/shared/hod-placeholder.png"}
                alt={hodName}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-tight mb-2">
              {hodName}
            </h2>
            <p className="text-orange font-medium">
              {hodDesignation}
            </p>
          </div>
        </div>

        {/* Right Side: Message */}
        <div className="w-full lg:w-2/3 bg-gray-50/50 rounded-3xl p-8 md:p-10 relative overflow-hidden border border-navy/5 shadow-sm">
          {/* Decorative quote mark in background */}
          <div className="absolute -top-6 -left-2 text-[150px] leading-none font-serif text-navy/[0.03] select-none pointer-events-none">
            &ldquo;
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-navy mb-6 tracking-tight">
              HOD's Message
            </h3>
            
            <div className="space-y-4 text-[15px] md:text-base text-[#5f6368] leading-relaxed italic font-serif">
              {hodMessage?.split('\n').map((paragraph: string, idx: number) => (
                paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default HodMessage;
