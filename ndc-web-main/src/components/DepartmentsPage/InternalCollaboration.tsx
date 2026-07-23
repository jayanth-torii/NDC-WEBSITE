import Image from "next/image";
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
    <Reveal as="section" className="relative border-b border-navy/10">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-[560px] overflow-hidden">
          <Image
            src={image}
            alt="Collaboration"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-navy/35" />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
            <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
              Partnership
            </p>
            <h2 className="text-white text-[clamp(1.6rem,2.8vw,2.35rem)] font-extrabold leading-tight tracking-[-0.03em] text-balance max-w-md">
              {title}
            </h2>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white px-6 py-12 md:px-10 lg:px-14 lg:py-16">
          <RevealGroup className="space-y-0">
            {Details.map((item, index) => (
              <RevealItem key={index}>
                <article className="group grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-8 border-b border-navy/10 last:border-b-0">
                  <span className="text-orange font-extrabold text-sm tracking-[0.16em] tabular-nums pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-navy tracking-tight mb-4 group-hover:text-orange transition-colors duration-300">
                      {item.title}
                    </h3>
                    <div className="space-y-3">
                      {item.descriptions.map((desc, i) => (
                        <p
                          key={i}
                          className="text-body-gray leading-relaxed text-[15px] md:text-base max-w-prose"
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
    </Reveal>
  );
};

export default InternalCollaboration;
