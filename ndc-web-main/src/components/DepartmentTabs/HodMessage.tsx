"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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

  const apiData: Record<string, HodData> = (departmentJson["hod-messages"] as any)?.data || {};
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
        HOD'S Message Not Found for <span className="font-semibold">{programme}</span>
      </h1>
    );
  }

  // ---------- MESSAGE LOGIC ----------
  const MAX_PREVIEW = 500;

  const fullMessage = (content.hodMessage || "").trim();
  const paragraphs = fullMessage.split(/\n+/).filter(Boolean);

  // ⬇️ preview across paragraphs, max 100 chars total, preserve paragraph breaks
  let remaining = MAX_PREVIEW;
  let truncated = false;
  const previewParagraphs: string[] = [];

  for (const p of paragraphs) {
    if (remaining <= 0) break;
    if (p.length <= remaining) {
      previewParagraphs.push(p);
      // subtract paragraph length + 1 (for an implied newline break)
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
      <div className="mt-10 md:mt-0 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* HOD Image Section */}
          <div className="flex flex-col items-center">
            <div
              className="relative w-full max-w-md aspect-[4/3] bg-contain bg-center bg-no-repeat rounded-[18px] overflow-hidden shadow-[var(--shadow-card)]"
              style={{
                backgroundImage: 'url("/images/department-banners/Background.png")',
              }}
            >
              <Image
                src={content.hodImage}
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                className="relative object-contain"
                alt="HOD Image"
              />
            </div>
            <div className="text-center mt-4">
              <p className="font-bold text-xl text-navy">{content.hodName}</p>
              <p className="text-lg text-orange">{content.hodDesignation}</p>
            </div>
          </div>

          {/* HOD Message Section */}
          <div className="mt-5 md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy tracking-[-0.5px] mb-4 text-center md:text-start">
              HOD’S MESSAGE
            </h2>

            {isExpanded ? (
              // FULL: render all paragraphs
              paragraphs.map((msg, idx) => (
                <p key={idx} className="text-justify text-body-gray mb-3 whitespace-pre-line leading-relaxed">
                  {msg}
                </p>
              ))
            ) : (
              // PREVIEW: render previewParagraphs; add "..." to the last one if truncated
              previewParagraphs.map((msg, idx) => {
                const isLast = idx === previewParagraphs.length - 1;
                return (
                  <p key={idx} className="text-justify text-body-gray mb-3 leading-relaxed">
                    {msg}
                    {isLast && truncated ? "..." : ""}
                  </p>
                );
              })
            )}

            {showToggle && (
              <Button
                variant="primary"
                onClick={() => setIsExpanded((v) => !v)}
                aria-expanded={isExpanded}
                className="mt-2"
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
