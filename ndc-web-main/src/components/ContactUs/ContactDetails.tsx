"use client";

import React from "react";
import IconChip from "@/components/ui/IconChip";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const telHref = (num: string) => `tel:${num.replace(/[^\d+]/g, "")}`;

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ContactDetails = ({ contactDetails, mapUrl }: { contactDetails: any, mapUrl: string }) => {
  if (!contactDetails) {
    return <p className="text-gray-500">Loading contact details...</p>;
  }

  // Find the 'Get In Touch' section
  const getInTouch = contactDetails.details.find((d: any) => d.title.toLowerCase() === "get in touch");
  // Find Address
  const addressSec = contactDetails.details.find((d: any) => d.title.toLowerCase() === "address");

  let intro = "";
  const phoneGroups: { label: string, numbers: string[] }[] = [];
  let email = { label: "", value: "" };

  if (getInTouch) {
    getInTouch.points.forEach((point: string) => {
      const p = point.trim();
      if (p.includes("@")) {
        // extract email
        const parts = p.split("write to:");
        if (parts.length > 1) {
          email = { label: parts[0].replace("For", "").trim(), value: parts[1].trim() };
        } else {
          email = { label: "Email", value: p };
        }
      } else if (p.includes("+91")) {
        // extract phones
        const parts = p.split(/–|:/);
        if (parts.length > 1) {
          const label = parts[0].replace("Call Us for", "").trim();
          const numbers = parts[1].split("|").map(n => n.trim());
          phoneGroups.push({ label, numbers });
        }
      } else if (p) {
        intro += p + " ";
      }
    });
  }

  return (
    <div className="flex h-full flex-col text-gray-900">
      <RevealGroup className="flex flex-col gap-6">
        <RevealItem>
          <div>
            <span className="mb-4 inline-flex items-center gap-[11px] text-[12.5px] font-bold uppercase tracking-[2.4px] text-[#f6872a]">
              <span className="h-[2px] w-[28px] rounded-full bg-[#f6872a]" />
              GET IN TOUCH
            </span>
            <h2 className="mb-6 text-[32px] font-extrabold leading-[1.15] tracking-tight text-[#0e2455] md:text-[36px] lg:text-[42px]">
              We would love to hear from <span className="text-[#f6872a]">You</span>
            </h2>
            {intro && <p className="mb-10 text-[16px] leading-[1.6] text-gray-600">{intro}</p>}

            <ul className="m-0 flex flex-col gap-8 p-0 list-none">
              {phoneGroups.map((grp) => (
                <li className="flex items-start gap-4" key={grp.label}>
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#f6872a]/10 text-[#f6872a]">
                    <IconPhone />
                  </div>
                  <div>
                    <p className="mb-1 text-[13px] font-bold uppercase tracking-[1px] text-gray-400">{grp.label}</p>
                    <div className="flex flex-wrap items-center gap-2 text-[18px] font-semibold text-[#0e2455]">
                      {grp.numbers.map((num, i) => (
                        <React.Fragment key={num}>
                          {i > 0 && <span className="text-gray-300">·</span>}
                          <a href={telHref(num)} className="hover:text-[#f6872a] transition-colors">{num}</a>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
              
              {email.value && (
                <li className="flex items-start gap-4">
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#f6872a]/10 text-[#f6872a]">
                    <IconMail />
                  </div>
                  <div>
                    <p className="mb-1 text-[13px] font-bold uppercase tracking-[1px] text-gray-400">{email.label || "Email"}</p>
                    <div className="text-[18px] font-semibold text-[#0e2455]">
                      <a href={`mailto:${email.value}`} className="hover:text-[#f6872a] transition-colors">{email.value}</a>
                    </div>
                  </div>
                </li>
              )}
            </ul>

            {addressSec && (
              <div className="mt-12 rounded-[16px] bg-[#f8f9fa] p-8 border border-gray-100">
                <h3 className="mb-4 text-[20px] font-bold text-[#0e2455]">{addressSec.title}</h3>
                <address className="mb-6 text-[16px] leading-[1.6] text-gray-600 not-italic">
                  {addressSec.points.map((ln: string, idx: number) => (
                    <React.Fragment key={idx}>
                      {ln}
                      <br />
                    </React.Fragment>
                  ))}
                </address>
                <a
                  className="inline-flex h-[48px] items-center justify-center gap-2 rounded-full border-2 border-[#0e2455] px-6 text-[14px] font-bold text-[#0e2455] transition-all hover:bg-[#0e2455] hover:text-white"
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconPin /> View On Google Maps
                </a>
              </div>
            )}
          </div>
        </RevealItem>
      </RevealGroup>
    </div>
  );
};

export default ContactDetails;
