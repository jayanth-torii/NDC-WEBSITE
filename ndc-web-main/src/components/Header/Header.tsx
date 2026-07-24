"use client";

import { useEffect, useRef, useState } from "react";
import { Burger, Drawer } from "@mantine/core";
import "@mantine/core/styles.css";
import { useRouter, usePathname } from "next/navigation";
import { IconChevronDown } from "@tabler/icons-react";
import Logo from "../../../public/images/NDC-Logo.png";
import Image from "next/image";

const APPLY_NOW_URL = "https://apply.nagarjunadegreecollege.co.in/";

type NavLink = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavLink[] };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Academics",
    href: "/departments",
    children: [
      { label: "Departments", href: "/departments" },
      { label: "Admissions", href: "/admissions" },
      { label: "Research", href: "/research" },
      { label: "Library", href: "/library" },
    ],
  },
  {
    label: "Students",
    href: "/students",
    children: [
      { label: "Students", href: "/students" },
      { label: "Activities", href: "/activities" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Alumni", href: "/alumni" },
  { label: "Library", href: "/library" },
  { label: "About Us", href: "/about-ndc" },
  { label: "Contact Us", href: "/contact-us" },
];

const isItemActive = (item: NavItem, pathname: string) =>
  item.href === pathname || (item.children?.some((c) => c.href === pathname) ?? false);

const desktopLinkClass = (active: boolean) =>
  `relative flex cursor-pointer items-center gap-1 text-[15px] font-semibold text-navy transition-colors duration-250 hover:text-orange focus:outline-none after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-orange after:transition-transform after:duration-250 after:ease-[cubic-bezier(0.23,1,0.32,1)] after:content-[''] ${
    active ? "text-orange after:w-full after:scale-x-100" : "after:w-full after:scale-x-0 hover:after:scale-x-100"
  }`;

const dropdownLinkClass =
  "block whitespace-nowrap px-4 py-2.5 text-sm font-medium text-navy transition-colors duration-150 hover:bg-chip-bg hover:text-orange";

const mobileLinkClass = (active: boolean) =>
  `cursor-pointer text-left text-base font-semibold transition-colors duration-200 focus:outline-none ${
    active ? "text-orange" : "text-navy hover:text-orange"
  }`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.pageYOffset;
      // Hysteresis: enter sticky past 100px, only leave once back under 60px.
      // Without a dead zone, hovering right at the threshold (momentum
      // scroll, trackpad drift) flips isSticky every frame and the header
      // visibly shakes as it snaps between its tall/short states.
      setIsSticky((prev) => (prev ? y > 60 : y > 100));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDesktopDropdown(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const go = (href: string) => {
    router.push(href);
    setMenuOpen(false);
    setOpenDesktopDropdown(null);
    setOpenMobileDropdown(null);
  };

  return (
      <nav
        ref={navRef}
        className={`sticky top-0 z-[50] w-full flex items-center justify-between border-b border-card-border bg-white/95 backdrop-blur-sm pl-0 pr-5 md:px-6 transition-all duration-500 ease-[var(--ease-editorial)] ${
          isSticky ? "h-[70px] md:h-[76px] py-2 shadow-md" : "h-[85px] md:h-[100px] lg:h-[110px] py-2 md:py-4 lg:py-4"
        }`}
      >
        {/* Logo */}
        <button onClick={() => go("/")} className="flex items-center">
          <Image
            src={Logo}
            alt="Nagarjuna Degree College"
            className={`object-contain ml-6 lg:ml-1 md:ml-1 transition-all duration-500 ease-[var(--ease-editorial)] ${isSticky ? "h-11 md:h-14 w-auto" : "h-16 md:h-20 lg:h-24 w-auto"}`}
          />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center gap-7 lg:gap-8 whitespace-nowrap">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative">
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDesktopDropdown(openDesktopDropdown === item.label ? null : item.label)
                    }
                    onMouseEnter={() => setOpenDesktopDropdown(item.label)}
                    className={desktopLinkClass(isItemActive(item, pathname))}
                  >
                    {item.label}
                    <IconChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${openDesktopDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDesktopDropdown === item.label && (
                    <div
                      onMouseLeave={() => setOpenDesktopDropdown(null)}
                      className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-card-border bg-white py-2 shadow-[var(--shadow-card-hover)]"
                    >
                      {item.children.map((child) => (
                        <button
                          key={child.href}
                          onClick={() => go(child.href)}
                          className={`${dropdownLinkClass} w-full text-left`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button onClick={() => go(item.href)} className={desktopLinkClass(isItemActive(item, pathname))}>
                  {item.label}
                </button>
              )}
            </div>
          ))}

          <a
            href={APPLY_NOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full bg-orange px-6 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-cta)] transition-all duration-200 hover:bg-[#e07520]"
          >
            Apply Now
          </a>
        </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Burger opened={menuOpen} onClick={() => setMenuOpen(!menuOpen)} color="#0e2455" />
          </div>

          {/* Mobile Drawer Menu */}
          <Drawer
            opened={menuOpen}
            onClose={() => setMenuOpen(false)}
            padding="md"
            title={<Image src={Logo} alt="Nagarjuna Degree College" width={140} height={36} className="object-contain" />}
            styles={{
              content: { background: "#ffffff" },
              header: { borderBottom: "1px solid var(--color-card-border, #e6ebf3)" },
            }}
          >
            <div className="flex flex-col space-y-1 pt-2">
              {NAV_ITEMS.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-card-border/60 py-2">
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(openMobileDropdown === item.label ? null : item.label)
                      }
                      className={`flex w-full items-center justify-between ${mobileLinkClass(isItemActive(item, pathname))}`}
                    >
                      {item.label}
                      <IconChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${openMobileDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openMobileDropdown === item.label && (
                      <div className="mt-2 flex flex-col space-y-3 pl-3">
                        {item.children.map((child) => (
                          <button
                            key={child.href}
                            onClick={() => go(child.href)}
                            className={mobileLinkClass(pathname === child.href)}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => go(item.href)}
                    className={`border-b border-card-border/60 py-3 ${mobileLinkClass(pathname === item.href)}`}
                  >
                    {item.label}
                  </button>
                )
              )}

              <a
                href={APPLY_NOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-4 rounded-full bg-orange px-6 py-3 text-center text-base font-bold text-white shadow-[var(--shadow-cta)] transition-all duration-200 hover:bg-[#e07520]"
              >
                Apply Now
              </a>
            </div>
          </Drawer>
        </nav>
  );
};

export default Header;
