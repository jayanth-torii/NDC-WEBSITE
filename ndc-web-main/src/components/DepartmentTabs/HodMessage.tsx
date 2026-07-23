"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Quote, User } from "lucide-react";
import departmentJson from "@/data-export/department/data.json";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface HodData {
  hodImage: string;
  hodName: string;
  hodDesignation: string;
  hodMessage: string;
}

const normalizeKey = (key: string) =>
  key.toLowerCase().replace(/[\s.&_-]/g, "").trim();

const HodMessage = ({ haveContentCheck }: any) => {
  const searchParams = useSearchParams();
  const programme = searchParams.get("programme") || "";
  const normalizedProgramme = normalizeKey(programme);

  const apiData: Record<string, HodData> =
    (departmentJson["hod-messages"] as any)?.data || {};
  const [isExpanded, setIsExpanded] = useState(false);

  const normalizedMap = useMemo(() => {
    const map: Record<string, HodData> = {};
    Object.keys(apiData || {}).forEach((k) => {
      map[normalizeKey(k)] = apiData[k];
    });
    return map;
  }, [apiData]);

  const content: HodData | undefined = useMemo(
    () => normalizedMap[normalizedProgramme],
    [normalizedMap, normalizedProgramme]
  );

  useEffect(() => {
    const exists =
      apiData != null &&
      Object.prototype.hasOwnProperty.call(normalizedMap, normalizedProgramme);
    haveContentCheck(exists);
  }, [apiData, normalizedMap, normalizedProgramme, haveContentCheck]);

  if (!content) {
    return (
      <h1 className="text-center text-red-500">
        HOD&apos;S Message Not Found for{" "}
        <span className="font-semibold">{programme}</span>
      </h1>
    );
  }

  const MAX_PREVIEW = 500;
  const fullMessage = (content.hodMessage || "").trim();
  const paragraphs = fullMessage.split(/\n+/).filter(Boolean);

  let remaining = MAX_PREVIEW;
  let truncated = false;
  const previewParagraphs: string[] = [];

  for (const p of paragraphs) {
    if (remaining <= 0) break;
    if (p.length <= remaining) {
      previewParagraphs.push(p);
      remaining -= p.length + 1;
    } else {
      previewParagraphs.push(p.slice(0, remaining));
      truncated = true;
      remaining = 0;
      break;
    }
  }

  const showToggle = fullMessage.length > MAX_PREVIEW;

  return (
    <Reveal>
      <div>
        <header className="pb-6 mb-8 border-b border-navy/10">
          <p className="text-orange text-[11px] font-bold tracking-[0.28em] uppercase mb-3">
            Leadership
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            HOD&apos;S MESSAGE
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-navy/10">
          <div className="lg:col-span-5 relative min-h-[280px] bg-surface-tint overflow-hidden">
            <div
              className="absolute inset-0 opacity-40 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("/images/Background.png")' }}
            />
            {content.hodImage ? (
              <Image
                src={content.hodImage}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain relative z-10"
                alt="HOD Image"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-navy z-10">
                <User size={56} strokeWidth={1.5} />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-6 z-20">
              <p className="font-bold text-xl text-white">{content.hodName}</p>
              <p className="text-orange text-sm font-bold tracking-wide uppercase mt-1">
                {content.hodDesignation}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 md:p-10 relative">
            <Quote
              size={64}
              className="text-orange/15 absolute top-4 right-6 -scale-x-100"
              aria-hidden
            />
            <div className="relative z-10 space-y-3">
              {isExpanded
                ? paragraphs.map((msg, idx) => (
                    <p
                      key={idx}
                      className="text-body-gray whitespace-pre-line leading-relaxed"
                    >
                      {msg}
                    </p>
                  ))
                : previewParagraphs.map((msg, idx) => {
                    const isLast = idx === previewParagraphs.length - 1;
                    return (
                      <p key={idx} className="text-body-gray leading-relaxed">
                        {msg}
                        {isLast && truncated ? "..." : ""}
                      </p>
                    );
                  })}
            </div>

            {showToggle && (
              <Button
                variant="primary"
                onClick={() => setIsExpanded((v) => !v)}
                aria-expanded={isExpanded}
                className="mt-6"
              >
                {isExpanded ? "SHOW LESS" : "READ MORE..."}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default HodMessage;
