"use client";

import { useState } from "react";
import { Burger, Drawer } from "@mantine/core";
import "@mantine/core/styles.css";
import { useRouter, usePathname } from "next/navigation";
import Logo from "../../../public/images/NDC-Logo.png";
import Image from 'next/image';

const Header = () => {
  const [menuOpen, setMenuOpen] =
    useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current page URL
  const [departmentsOpen, setDepartmentsOpen] = useState(false);


  const handleAboutNdc = () => {
    setDepartmentsOpen(!departmentsOpen);
    router.push("/about-ndc");
    setMenuOpen(false);
  };

  const handleDepartmentsClick = () => {
    setDepartmentsOpen(!departmentsOpen);
    router.push("/departments");
    setMenuOpen(false);
  };

  const handleGalleryClick = () => {
    setDepartmentsOpen(!departmentsOpen);
    router.push("/gallery");
    setMenuOpen(false);
  };

  const handleDepartmentHome = () => {
    router.push("/");
    setMenuOpen(false);
  }

  const handleStudentsClick = () => {
    router.push("/students");
    setMenuOpen(false);
  }

  const handleActivitiesClick = () => {
    router.push("/activities");
    setMenuOpen(false);
  }


  const handleContactUsClick = () => {
    router.push("/contact-us");
    setMenuOpen(false);
  }

  const handleAdmissionClick = () => {
    router.push("/admissions");
    setMenuOpen(false);
  }

  const handleResearchClick = () => {
    router.push("/research");
    setMenuOpen(false);
  }

  const handleAlumniClick = () => {
    router.push("/alumni");
    setMenuOpen(false);
  }

  const handleLibraryClick = () => {
    router.push("/library");
    setMenuOpen(false);
  }

  const handleApplyNowClick = () => {
    window.open("https://apply.nagarjunadegreecollege.co.in/", "_blank", "noopener,noreferrer");
    setMenuOpen(false);
  }

  return (
    <nav className="flex items-center justify-between pl-0 pr-5 py-4 md:px-5 md:py-10  lg:py-10  bg-white shadow-md h-auto md:h-[100px] lg:h-[118px] relative">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/"><Image src={Logo} alt="Logo" width={200} height={50} className="object-contain ml-6 lg:ml-5 md:ml-3" /></a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex md:justify-end gap-3 lg:mr-10 lg:gap-5 text-gray-700 text-xs md:text-lg whitespace-nowrap relative justify-end">


        <div className="hidden md:flex md:justify-end gap-3  lg:gap-5 text-gray-700 text-xs md:text-lg whitespace-nowrap relative justify-end">
          <div
            className="relative group"
            onMouseEnter={() => setDepartmentsOpen(true)}
            onMouseLeave={() => setDepartmentsOpen(false)}
          >
            <button
              onClick={handleAboutNdc}
              className={` cursor-pointer text-lg hover:text-blue-500 focus:outline-none ${pathname === "/about-ndc" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              About Us
            </button>
          </div>
        </div>


        <div
          className="relative group"
          onMouseEnter={() => setDepartmentsOpen(true)}
          onMouseLeave={() => setDepartmentsOpen(false)}
        >
          <button
            onClick={handleDepartmentsClick}
            className={`cursor-pointer text-lg  hover:text-blue-500 focus:outline-none ${pathname === "/departments" ? "border-b-2 border-[#F09300]" : ""
              }`}
          >
            Departments
          </button>
          {/* {departmentsOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">About Nagarjuna</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Admissions</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">About University</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Principal’s Message</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Academic Council</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Governing Council</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Policy Documents</a>
            </div>
          )} */}
        </div>


        <div className="hidden md:flex md:justify-end gap-3  lg:gap-5 text-gray-700 whitespace-nowrap relative justify-end">
          <div
            className="relative group"
            onMouseEnter={() => setDepartmentsOpen(true)}
            onMouseLeave={() => setDepartmentsOpen(false)}
          >
            <button
              onClick={handleStudentsClick}
              className={`cursor-pointer text-xs md:text-lg hover:text-blue-500 focus:outline-none ${pathname === "/students" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Students
            </button>
          </div>
        </div>



        <div className="hidden md:flex md:justify-end gap-3  lg:gap-5 text-gray-700 text-xs md:text-lg whitespace-nowrap relative justify-end">
          <div
            className="relative group"
            onMouseEnter={() => setDepartmentsOpen(true)}
            onMouseLeave={() => setDepartmentsOpen(false)}
          >
            <button
              onClick={handleActivitiesClick}
              className={`cursor-pointer text-xs md:text-lg hover:text-blue-500 focus:outline-none ${pathname === "/activities" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Activities
            </button>
          </div>
        </div>



        <div className="hidden md:flex md:justify-end gap-3  lg:gap-5 text-gray-700 text-xs md:text-lg whitespace-nowrap relative justify-end">
          <div
            className="relative group"
            onMouseEnter={() => setDepartmentsOpen(true)}
            onMouseLeave={() => setDepartmentsOpen(false)}
          >
            <button
              onClick={handleGalleryClick}
              className={`cursor-pointer text-lg hover:text-blue-500 focus:outline-none ${pathname === "/gallery" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Gallery
            </button>
          </div>
        </div>


        <div className="hidden md:flex md:justify-end gap-3  lg:gap-5 text-gray-700 text-xs md:text-lg whitespace-nowrap relative justify-end">
          <div
            className="relative group"
            onMouseEnter={() => setDepartmentsOpen(true)}
            onMouseLeave={() => setDepartmentsOpen(false)}
          >
            <button
              onClick={handleContactUsClick}
              className={`cursor-pointer text-lg hover:text-blue-500 focus:outline-none ${pathname === "/contact-us" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden ">
        <Burger opened={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer opened={menuOpen} onClose={() => setMenuOpen(false)} padding="md">
        <div className="flex flex-col space-y-4 text-gray-700 text-sm">
          <a href="#" onClick={handleDepartmentHome} className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/" ? "border-b-1 border-[#F09300]" : ""
            }`} >
            Home
          </a>


          <div>
            <button
              onClick={handleAboutNdc}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/about-ndc" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              About Us
            </button>
          </div>

          <div>
            <button
              onClick={handleDepartmentsClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/departments" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Departments
            </button>
            {/* {departmentsOpen && (
              <div className="mt-2 bg-white border rounded shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">About Nagarjuna</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Admissions</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">About University</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Principal’s Message</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Academic Council</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Governing Council</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Policy Documents</a>
              </div>
            )} */}
          </div>



          <div>
            <button
              onClick={handleAdmissionClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/admissions" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Admissions
            </button>
          </div>

          <div>
            <button
              onClick={handleResearchClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/research" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Research
            </button>
          </div>

          <div>
            <button
              onClick={handleAlumniClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/alumni" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Alumni
            </button>
          </div>

          <div>
            <button
              onClick={handleLibraryClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/library" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Library
            </button>
          </div>

          <div>
            <button
              onClick={handleApplyNowClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/apply-now " ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Apply Now
            </button>
          </div>


          <div>
            <button
              onClick={handleStudentsClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/students" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Students
            </button>
          </div>


          <div>
            <button
              onClick={handleActivitiesClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/activities" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Activities
            </button>
          </div>


          <div>
            <button
              onClick={handleGalleryClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/gallery" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Gallery
            </button>
          </div>


          <div>
            <button
              onClick={handleContactUsClick}
              className={`cursor-pointer hover:text-blue-500 focus:outline-none ${pathname === "/contact-us" ? "border-b-2 border-[#F09300]" : ""
                }`}
            >
              Contact Us
            </button>
          </div>

        </div>
      </Drawer>
    </nav>
  );
};

export default Header;
