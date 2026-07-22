import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

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
    <Reveal as="section" className="container mb-8 md:mb-20">
      <div className="bg-white">
        <SectionHeading title={title} className="mb-10 items-center md:items-start text-center md:text-left" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left Image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <Image
              src={image}
              alt="Collaboration"
              width={500}
              height={500}
              className="rounded-[18px] shadow-[var(--shadow-card)] border border-card-border"
            />
          </div>

          {/* Right Text */}
          <div className="w-full md:w-2/3 text-left">
            {Details.map((item, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                {item.descriptions.map((desc, i) => (
                  <p key={i} className="text-body-gray leading-relaxed text-justify mb-2">
                    {desc}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default InternalCollaboration;
