'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const navPages = [
    { href: '/', label: 'Home' },
    { href: '/admissions', label: 'Admissions', },
    { href: '/research', label: 'Research', },
    { href: '/alumni', label: 'Alumni', },
    { href: '/library', label: 'Library' },
    { href: '/apply-now', label: 'Apply Now', external: false },
  ];

  const searchPages = [
    ...navPages,
    { href: '/about-nagarjuna', label: 'About Us', external: false },
    { href: '/departments#ug_programme', label: 'Departments', external: false },
    { href: '/research', label: 'Research', external: false },
    { href: '/gallery', label: 'Gallery', external: false },
    { href: '/examination', label: 'Examination', external: false },
    { href: '/contact-us', label: 'Contact Us', external: false },
    // { href: '/department?programme=Computer%20Science%20%26%20Engineering', label: 'CSE', external: false },
    // { href: '/department?programme=Electronics%20%26%20Communication%20Engineering', label: 'ECE', external: false },
    // { href: '/department?programme=Information%20Science%20%26%20Technology', label: 'ISE', external: false },
    // { href: '/department?programme=Artificial%20Intelligence%20%26%20Machine%20Learning', label: 'AIML', external: false },
    // { href: '/department?programme=Civil%20Engineering', label: 'Civil', external: false },
    // { href: '/department?programme=CSE%20Data%20Science', label: 'DATA SCIENCE', external: false },
    // { href: '/department?programme=Department%20Of%20MBA', label: 'MBA', external: false },
    // { href: '/department?programme=M.Tech%20Structural', label: 'MTech', external: false },
    // { href: '/department?programme=Social%20Science%20%26%20Foreign%20Languages', label: 'SSFL', external: false },
    // { href: '/department?programme=Department%20Of%20Mathematics', label: 'Mathematics', external: false },
    // { href: '/department?programme=Department%20Of%20Physics', label: 'Physics', external: false },
    // { href: '/department?programme=Department%20Of%20Chemistry', label: 'Chemistry', external: false },
    // { href: '/department?programme=Mechanical%20Engineering', label: 'Mechanical', external: false },
    { href: '/nirf', label: 'NIRF', external: false },
    { href: '/blog', label: 'Blog', external: false },
    { href: '/approvals-&-disclosure', label: 'Approvals', external: false },
    { href: '/nba-visit', label: 'NBA Visit', external: false },
    { href: '/alumni', label: 'Alumni', external: false },
    { href: '/samashti', label: 'Samashti', external: false },
    { href: '/monthly-reports', label: 'Monthly Reports', external: false },
    { href: '/yuvothsava', label: 'Yuvothsava', external: false },
    { href: '/audit-reports', label: 'Audit Reports', external: false },
    { href: '/nisp-policy', label: 'NISP Policy', external: false },
    { href: '/autonomous-regulations', label: 'Autonomous Regulations', external: false },
  ];

  const executeSearch = () => {
    const query = searchQuery.trim().toLowerCase();

    const matchedPage =
      searchPages.find((page) =>
        page.label.toLowerCase().startsWith(query)
      ) ||
      searchPages.find((page) =>
        page.label.toLowerCase().includes(query)
      );

    if (matchedPage) {
      if (matchedPage.external) {
        window.open(matchedPage.href, '_blank', 'noopener noreferrer');
      } else {
        router.push(matchedPage.href);
      }
      setSearchQuery('');
    } else {
      // alert('Page not found!');
      setSearchQuery('');
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  return (
    <nav className="hidden md:block bg-[#0A1F44] p-4 flex items-center justify-between flex-nowrap px-6 md:px-12">
      <div className="hidden md:flex flex-wrap gap-x-4 text-white whitespace-nowrap">
        {navPages.map(({ href, label, external }) => (
          label === 'Apply Now' ? (
            <Link
              key={href}
              href="https://apply.nagarjunadegreecollege.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-normal cursor-pointer bg-transparent border-none text-white whitespace-nowrap"
            >
              {label}
            </Link>
          ) : (
            <Link
              key={href}
              href={href}
              target={external ? '_blank' : '_self'}
              rel={external ? 'noopener noreferrer' : undefined}
              className={`hover:text-gray-300 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-normal ${pathname === href ? 'border-b-2 border-[#EF7EAD]' : ''
                }`}
            >
              {label}
            </Link>
          )
        ))}
      </div>

      <div className="hidden relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]">
        <div className="relative">
          <Input
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm p-1 pr-10"
          />
          <IconSearch
            size={18}
            stroke={1.5}
            onClick={executeSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
