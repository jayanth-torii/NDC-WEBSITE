import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface CollaborationDetail {
  title: string;
  descriptions: string[];
}

interface InternalCollaborationProps {
  data: {
    title: string;
    image: string;
    Details: CollaborationDetail[];
  };
}

const InternalCollaboration = ({ data }: InternalCollaborationProps) => {
  const { title, image, Details } = data;

  return (
    <Reveal as="section" className="relative border-b border-navy/10 py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Animated Framed Image */}
          <div className="relative w-full max-w-[320px] md:max-w-[380px] mx-auto lg:mx-0 aspect-[4/5] group">
            
            {/* Background shapes (Navy and Orange frames) */}
            <div className="absolute inset-0 bg-navy rounded-[32px] md:rounded-[48px] rounded-tl-none -translate-x-4 translate-y-4 md:-translate-x-6 md:translate-y-6 transition-transform duration-500 group-hover:-translate-x-6 group-hover:translate-y-8" />
            <div className="absolute inset-0 border-[4px] md:border-[6px] border-orange rounded-[32px] md:rounded-[48px] rounded-br-none translate-x-4 -translate-y-4 md:translate-x-6 md:-translate-y-6 transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-8" />
            
            {/* Main Image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src={image}
                alt="Collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Overlapping Stats Card */}
            <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105 border border-gray-100">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange shrink-0">
                <GraduationCap size={28} />
              </div>
              <div>
                <p className="text-gray-500 text-[11px] md:text-[13px] font-bold uppercase tracking-wider mb-0.5">
                  In the Year
                </p>
                <p className="text-navy font-black text-lg md:text-xl leading-tight">
                  2002
                </p>
              </div>
            </div>

          </div>

          {/* Text Content */}
          <div className="lg:pl-6">
            <RevealItem>
              <p className="text-orange text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2">
                Partnership
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-navy mb-8 text-balance">
                {title}
              </h2>
            </RevealItem>

            <RevealGroup className="space-y-5 md:space-y-6">
              {Details.map((item, index) => (
                <RevealItem key={index}>
                  <article className="flex gap-4 md:gap-6 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-navy/5 flex items-center justify-center shrink-0 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                      <span className="text-navy font-extrabold text-sm md:text-base tracking-[0.1em] tabular-nums group-hover:text-white transition-colors duration-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-navy tracking-tight mb-3 group-hover:text-orange transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="space-y-2">
                        {item.descriptions.map((desc, i) => (
                          <p
                            key={i}
                            className="text-body-gray leading-relaxed text-sm md:text-[15px] max-w-prose"
                          >
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

        </div>
      </div>
    </Reveal>
  );
};

export default InternalCollaboration;
