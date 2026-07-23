"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { ChevronDown, MapPin } from "lucide-react";

const SLIDE_DURATION = 10000;

export default function HomeHero({ data }: any) {
  const { location, slides } = data;
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  return (
    <>
      <section className="relative w-full" aria-label="NDC highlights">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes hero-zoom { to { transform: scale(1); } }
          @keyframes hero-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
          @keyframes hero-fill { from { width: 0%; } to { width: 100%; } }
          .animate-hero-zoom { animation: hero-zoom 8s ease-out forwards; }
          .animate-hero-fade { animation: hero-fade 0.7s cubic-bezier(0.23,1,0.32,1) both; }
          .animate-hero-fade-1 { animation: hero-fade 0.7s cubic-bezier(0.23,1,0.32,1) 0.08s both; }
          .animate-hero-fade-2 { animation: hero-fade 0.7s cubic-bezier(0.23,1,0.32,1) 0.16s both; }
          .animate-hero-fill { animation: hero-fill ${SLIDE_DURATION}ms linear forwards; }
        `,
          }}
        />

        <div className="relative h-[86vh] min-h-[560px] lg:h-[92vh] lg:min-h-[640px] lg:max-h-[880px] overflow-hidden bg-navy">
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center md:scale-[1.08] md:animate-hero-zoom"
            style={{ backgroundImage: `url(${slides[index]?.image})` }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(100deg, rgba(10,22,55,0.94) 0%, rgba(14,36,85,0.82) 32%, rgba(14,36,85,0.42) 62%, rgba(14,36,85,0.18) 100%)",
            }}
          />
          <div
            className="absolute inset-0 z-10 bg-dot-grid-light opacity-[0.05] mix-blend-overlay"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-navy-dark/70 to-transparent"
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 relative h-full flex items-center z-20">
            <div className="max-w-[640px] text-white leading-normal">
              <span className="animate-hero-fade inline-flex items-center gap-2 text-white text-[13px] font-semibold tracking-[1.2px] uppercase px-4 py-2 border border-white/30 rounded-full mb-6 backdrop-blur-md bg-white/5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                Welcome to NDC
              </span>

              <div key={`content-${index}`}>
                <h1 className="animate-hero-fade-1 text-white text-[36px] md:text-[46px] lg:text-[60px] leading-[1.06] font-extrabold tracking-[-1.2px] m-0 mb-5">
                  {slides[index]?.title}
                </h1>
                <p className="animate-hero-fade-2 text-white/85 text-[16px] md:text-[19px] leading-[1.65] m-0 mb-8 max-w-[540px]">
                  {slides[index]?.description}
                </p>
              </div>

              <div className="flex gap-3.5 flex-wrap">
                <Button href="https://apply.nagarjunadegreecollege.co.in/" external variant="primary">
                  Apply Now
                </Button>
                <Button href={location} external variant="ghost-light">
                  <MapPin size={16} className="opacity-80" />
                  View Location on Map
                </Button>
              </div>

              {/* Slide progress indicators */}
              <div className="flex gap-2.5 mt-9" role="tablist">
                {slides.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="relative h-[4px] w-[38px] rounded-full bg-white/25 overflow-hidden cursor-pointer"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-selected={i === index}
                    role="tab"
                  >
                    {i === index && (
                      <span key={index} className="absolute inset-y-0 left-0 bg-orange rounded-full animate-hero-fill" />
                    )}
                    {i < index && <span className="absolute inset-0 bg-white/70 rounded-full" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 text-white/60">
            <span className="text-[11px] font-semibold uppercase tracking-[2px]">Scroll</span>
            <ChevronDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* Floating action cluster */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-[9999] hidden sm:flex flex-col overflow-hidden rounded-l-xl shadow-[var(--shadow-navy)]">
        <a href="/contact-us">
          <button
            style={{ writingMode: "vertical-rl" }}
            className="cursor-pointer rotate-180 bg-navy px-3 py-5 text-[13px] font-bold tracking-[1.5px] text-white transition-colors duration-250 ease-[var(--ease-editorial)] hover:bg-navy-dark"
          >
            Have a query?
          </button>
        </a>
        <a href="https://apply.nagarjunadegreecollege.co.in/" target="_blank" rel="noopener noreferrer">
          <button
            style={{ writingMode: "vertical-rl" }}
            className="cursor-pointer rotate-180 bg-orange px-3 py-5 text-[13px] font-bold tracking-[1.5px] text-white transition-colors duration-250 ease-[var(--ease-editorial)] hover:bg-orange-dark"
          >
            Application Form
          </button>
        </a>
      </div>
    </>
  );
}
