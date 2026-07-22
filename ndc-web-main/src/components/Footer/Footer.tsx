"use client";
import React, { useState, type ReactElement, type ReactNode } from "react";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconLink,
  IconSchool,
  IconFileText,
  IconShieldCheck,
  IconChevronDown,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { FaLinkedin, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import footerJson from "@/data-export/_shared/footer.json";
import PdfModal from "../PdfModal";

type FooterLinkItem = {
  id: number;
  title: string;
  type: "link" | "pdf";
  link: string | null;
  pdf_link: string | null;
};

const socialIcons: Record<string, ReactElement> = {
  LinkedIn: <FaLinkedin />,
  Facebook: <FaFacebookF />,
  Instagram: <FaInstagram />,
  Youtube: <FaYoutube />,
};

const linkItemClass = "transition-colors duration-200 hover:text-orange cursor-pointer";
const columnTitleClass = "text-sm font-bold uppercase tracking-[1px] text-white";
const iconChipClass = "flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-orange/15 text-orange";
const contactChipClass = "flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-orange/15 text-orange";
const captionClass = "text-[11px] font-bold uppercase tracking-[1.5px] text-orange";

const FooterLinkColumn = ({
  icon,
  title,
  items,
  onPdfClick,
}: {
  icon: ReactNode;
  title: string;
  items: FooterLinkItem[] | undefined;
  onPdfClick: (pdfUrl: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!items || items.length === 0) return null;

  const preview = items.slice(0, 3);
  const rest = items.slice(3);
  const hasMore = rest.length > 0;

  const renderItem = (item: FooterLinkItem) => (
    <li key={item.id}>
      {item.type === "pdf" ? (
        <button type="button" onClick={() => item.pdf_link && onPdfClick(item.pdf_link)} className={linkItemClass}>
          {item.title}
        </button>
      ) : (
        <a
          href={item.link ?? "#"}
          target={item.link?.startsWith("http") ? "_blank" : undefined}
          rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
          className={linkItemClass}
        >
          {item.title}
        </a>
      )}
    </li>
  );

  return (
    <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-5">
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 md:pointer-events-none md:cursor-default"
      >
        <span className={`flex items-center gap-2.5 ${columnTitleClass}`}>
          <span className={iconChipClass}>{icon}</span>
          {title}
        </span>
        <IconChevronDown
          size={16}
          className={`shrink-0 text-white/70 transition-transform duration-200 md:hidden ${mobileOpen ? "rotate-180" : ""}`}
        />
      </button>

      <ul className={`${mobileOpen ? "flex" : "hidden"} md:flex mt-4 flex-col gap-2.5 text-sm text-white/70`}>
        {preview.map(renderItem)}
        {expanded && rest.map(renderItem)}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className={`${mobileOpen ? "flex" : "hidden"} md:flex mt-4 items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white/90 transition-colors duration-200 hover:border-orange hover:text-orange`}
        >
          {expanded ? "View less" : "View all"}
          <IconArrowUpRight size={14} />
        </button>
      )}
    </div>
  );
};

const Footer = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const footerData: Record<string, any> | null = (footerJson.footer as any)?.data ?? null;

  const phones = (footerData?.contactInfo?.phone ?? "")
    .split("|")
    .map((p: string) => p.trim())
    .filter(Boolean);
  const emails = (footerData?.contactInfo?.email ?? "")
    .split(",")
    .map((e: string) => e.trim())
    .filter(Boolean);

  const socialRow = (size: number) => (
    <>
      {footerData?.follow &&
        footerData.follow.map(({ title, link }: any) => (
          <a
            key={title}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={title}
            style={{ height: size, width: size }}
            className="flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-orange hover:bg-orange"
          >
            {socialIcons[title] || title}
          </a>
        ))}
    </>
  );

  return (
    <footer
      className="relative overflow-hidden text-sm md:text-base"
      style={{
        background:
          "radial-gradient(760px circle at 92% -10%, rgba(50,112,252,.16), transparent 46%), linear-gradient(160deg, #0e2455 0%, #0a1a3f 58%, #112a5e 100%)",
      }}
    >
      {/* watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-2 top-0 hidden select-none font-black leading-none text-white/[0.05] md:block"
        style={{ writingMode: "vertical-rl", fontSize: "clamp(48px, 5.4vw, 76px)" }}
      >
        NDC
      </span>

      <div className="relative container mx-auto px-4 py-12 md:px-10 md:py-16 lg:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-8 lg:gap-10">
          {/* Follow us rail */}
          <div className="flex flex-col items-center gap-4 md:w-12 md:shrink-0 md:pl-8">
            <h3 className="hidden text-[11px] font-bold uppercase tracking-[2px] text-white/60 md:block" style={{ writingMode: "vertical-rl" }}>
              Follow Us
            </h3>
            <h3 className={`${columnTitleClass} md:hidden`}>Follow Us On</h3>
            <div className="flex gap-3 md:flex-col">{socialRow(34)}</div>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center gap-4 text-center md:w-64 md:shrink-0 md:items-start md:text-left">
            {phones.length > 0 && (
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <span className={contactChipClass}>
                  <IconPhone size={16} />
                </span>
                <div>
                  <p className={captionClass}>Toll Free</p>
                  <p className="mt-0.5 text-white/80">
                    {phones.map((phone: string, i: number) => (
                      <span key={phone}>
                        <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-orange transition-colors">
                          {phone}
                        </a>
                        {i < phones.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            )}

            {emails.length > 0 && (
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <span className={contactChipClass}>
                  <IconMail size={16} />
                </span>
                <div>
                  <p className={captionClass}>Email</p>
                  <p className="mt-0.5 text-white/80">
                    {emails.map((email: string, i: number) => (
                      <span key={email}>
                        <a href={`mailto:${email}`} className="hover:text-orange transition-colors">
                          {email}
                        </a>
                        {i < emails.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            )}

            {footerData?.contactInfo?.address && (
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <span className={contactChipClass}>
                  <IconMapPin size={16} />
                </span>
                <div>
                  <p className={captionClass}>Address</p>
                  <a
                    href={footerData?.contactInfo?.address_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-white/80 hover:text-orange transition-colors"
                  >
                    {footerData?.contactInfo?.address}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            <FooterLinkColumn
              icon={<IconLink size={15} />}
              title="Important Links"
              items={footerData?.importantLinks}
              onPdfClick={setSelectedPdf}
            />
            <FooterLinkColumn
              icon={<IconSchool size={15} />}
              title="Academics"
              items={footerData?.acadamics}
              onPdfClick={setSelectedPdf}
            />
            <FooterLinkColumn
              icon={<IconFileText size={15} />}
              title="Reports & Publications"
              items={footerData?.reports_and_publications}
              onPdfClick={setSelectedPdf}
            />
            <FooterLinkColumn
              icon={<IconShieldCheck size={15} />}
              title="Policies & Guidelines"
              items={footerData?.policies}
              onPdfClick={setSelectedPdf}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-black/[0.18] py-5">
        <div className="container mx-auto flex flex-col items-center justify-center gap-3 px-4 text-center text-xs text-white/60 md:flex-row md:justify-between md:px-10 md:text-sm lg:px-16">
          <div className="flex items-center gap-3">
            {footerData?.contactInfo?.logo && (
              <Image
                src={footerData.contactInfo.logo}
                alt="Nagarjuna Degree College"
                width={28}
                height={28}
                className="h-7 w-auto object-contain"
              />
            )}
            <p>{footerData?.contactInfo?.rights_reserved}</p>
          </div>

          <a
            href="https://toriiminds.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 transition-colors hover:text-orange"
          >
            <span>Powered by</span>
            <Image
              src="https://ncet-727596873106-ap-south-2-an.s3.ap-south-2.amazonaws.com/images/uploads/1782973938696-logo.png"
              alt="Torii Minds"
              width={80}
              height={20}
              className="h-4 w-auto object-contain"
            />
          </a>
        </div>
      </div>

      <PdfModal pdfUrl={selectedPdf} onClose={() => setSelectedPdf(null)} />
    </footer>
  );
};

export default Footer;
