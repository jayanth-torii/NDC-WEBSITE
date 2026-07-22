import Image from "next/image";

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
    <section className="container mb-8 md:mb-20">
      <div className="bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0E2455] text-center md:text-left mb-10">
          {title}
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left Image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <Image 
              src={image} 
              alt="Collaboration" 
              width={500} 
              height={500} 
              className="rounded-lg"
            />
          </div>

          {/* Right Text */}
          <div className="w-full md:w-2/3 text-left">
            {Details.map((item, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#0E2455] mb-2">
                  {item.title}
                </h3>
                {item.descriptions.map((desc, i) => (
                  <p key={i} className="text-[#0E2455] leading-relaxed text-justify mb-2">
                    {desc}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalCollaboration;
