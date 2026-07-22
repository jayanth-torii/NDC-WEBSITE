import Image from "next/image";


const HodMessage = ({data} :any) => {
  const {title, image, name, position, message} = data
  return (
    <section className="container mb-8 md:mb-20">
      <div className="rounded-[18px] border border-card-border bg-white p-6 shadow-[var(--shadow-card)] md:p-8">
        <h1 className="mb-10 text-center text-2xl font-extrabold tracking-[-0.5px] text-navy md:text-left md:text-3xl">{title}</h1>
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
          {/* Left Container (Image) */}
          <div className="flex w-full justify-center md:w-1/3">
            <Image
              src={image}
              alt="Principal"
              width={500}
              height={500}
              className="rounded-[16px] border border-card-border shadow-[var(--shadow-card)]"
            />
          </div>

          {/* Right Container (Text Content) */}
          <div className="w-full text-center md:w-2/3 md:text-left">
            <h2 className="mb-3 text-left text-xl font-bold text-navy lg:text-2xl">{name}</h2>
            <p className="mb-5 text-left text-xl font-semibold text-orange">{position}</p>
            {message.map((each:any , index:any) => (
              <p key={index} className="mb-4 mt-4 text-justify leading-relaxed text-body-gray"> {each} </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HodMessage;
