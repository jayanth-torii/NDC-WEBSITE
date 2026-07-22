"use client";
import { BASE_URL } from "@/config/apiService";

import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// import { HomePageContent } from "@/app/Data/HomePageContent";
// const { sideButtons} = HomePageContent.bannerSection;

export default function HomeHero({ data }: any) {
  const { location, slides } = data

  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    // setIsPopupOpen(true); // Removed automatic open on load
  }, []);


  const [index, setIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    district: "",
    state: "",
    course: "",
    consent: false,
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    email: "",
    course: "",
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Cleanup to prevent memory leaks
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "phoneNumber" && !/^[0-9]{10}$/.test(value)) {
        setErrors((prev) => ({ ...prev, phoneNumber: "Enter a valid 10-digit phone number" }));
      } else if (name === "phoneNumber") {
        setErrors((prev) => ({ ...prev, phoneNumber: "" }));
      }

      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
      } else if (name === "email") {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      showMessage("Please enter a valid 10-digit phone number.", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    setLoading(true); // Show loading spinner

    const { consent, ...formDataToSend } = formData; // Exclude consent from form data

    try {
      const response = await fetch(`${BASE_URL}/apply-now-forms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formDataToSend }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Strapi error response:", errorResponse);
        throw new Error("Submission failed");
      }

      const result = await response.json();


      // Show success message and close popup after 2 seconds
      showMessage("Application submitted successfully!", "success");

      // Reset form after submission
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        district: "",
        state: "",
        course: "",
        consent: false,
      });
      setErrors({ phoneNumber: "", email: "", course: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      showMessage("An error occurred while submitting the form.", "error");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });

    if (type === "success") {
      // Wait 2 seconds before closing the popup
      setTimeout(() => {
        setMessage(null);      // Clear the message
        setIsPopupOpen(false); // Close the popup AFTER the message is shown
      }, 2000);
    } else {
      // Show error message for 2 seconds without closing the popup
      setTimeout(() => setMessage(null), 2000);
    }
  };


  return (
    <>
      {/* Hero Section */}
      {/* Banner Container */}
      <div className="relative w-full overflow-hidden">
        {/* Mobile Banner */}
        <div className="w-full">
          <img
            src={slides[index]?.image}
            alt="Home Banner Image"
            className="w-full h-[25vh] lg:h-[70vh] aspect-[16/9] md:aspect-[3/1.2] object-cover"
          />

          <div className="hidden lg:block absolute bottom-6 left-6 bg-[#cce8ee35] text-white bg-opacity-80 backdrop-blur-md rounded shadow-md p-4 max-w-[360px] z-10">
            <h2 className="text-xl font-semibold text-white">
              {slides[index]?.title}
            </h2>
            <p className="text-sm mt-1 mb-2 text-white">
              {slides[index]?.description}
            </p>
            <div className="flex items-center space-x-2">
              <a href={location} target="__blank" rel="noopener noreferrer">
                <button className="bg-[#0E2455] text-white px-3 py-1 text-sm">
                  View Location on Map
                </button>
              </a>
              <button
                onClick={prevSlide}
                className="p-1 border-2 border-white bg-transparent text-white rounded-full hover:bg-white hover:text-black transition"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextSlide}
                className="p-1 border-2 border-white bg-transparent text-white rounded-full hover:bg-white hover:text-black transition"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>



        {/* Fixed Buttons */}
        <div className="fixed top-[60vh] right-[-9.5vw] transform rotate-[-90deg] hidden sm:flex z-[9999]">
          <a href="/contact-us">
            <button className="bg-[#0e2455] text-white text-[1vw] py-[0.3vw] px-[2vw] rounded-sm cursor-pointer mr-1">
              Have a query?
            </button>
          </a>
          <a href="https://apply.nagarjunadegreecollege.co.in/" target="_blank" rel="noopener noreferrer">
            <button className="bg-[#f6872a] text-white text-[1vw] py-[0.3vw] px-[2vw] rounded-sm cursor-pointer">
              Application Form
            </button>
          </a>
        </div>


      </div>


      {/* Application Form Popup */}
      {/* {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#060606b9] bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] relative">
            <button
              className="cursor-pointer absolute top-6 right-5 text-gray-700 text-lg hover:text-[red]"
              onClick={() => setIsPopupOpen(false)}
            >
              ✖
            </button>

            <h3 className="text-xl font-bold text-center mb-3 text-[#0E2455]">
              Admissions Open For 2026-2027
            </h3>

            <form onSubmit={handleSubmit}>
              <FormInput label="Your Name" name="fullName" value={formData.fullName} handleChange={handleChange} required />
              <FormInput label="Email" name="email" value={formData.email} handleChange={handleChange} required error={errors.email} />
              <FormInput label="Phone Number" name="phoneNumber" value={formData.phoneNumber} handleChange={handleChange} required error={errors.phoneNumber} maxLength={10} />
              <FormInput label="District" name="district" value={formData.district} handleChange={handleChange} required />
              <FormInput label="State" name="state" value={formData.state} handleChange={handleChange} required />

              <div className="mb-3">
                <label className="block text-gray-700">Courses Offered</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded border-gray-300"
                  required
                >
                  <option value="">-- Select a Course --</option>
                  <option value="B.Com - Regular">B.Com - Regular</option>
                  <option value="B.Com + CA Foundation">B.Com + CA Foundation</option>
                  <option value="B.Com + US - CMA">B.Com + US - CMA</option>
                  <option value="B.Com + CMA">B.Com + CMA</option>
                  <option value="B.Com + UK-ACCA">B.Com + UK-ACCA</option>
                  <option value="B.Com + CS">B.Com + CS</option>
                  <option value="B.Com + SAP">B.Com + SAP</option>
                  <option value="B.Com + KPMG Certified Accounting Program">B.Com + KPMG Certified Accounting Program</option>
                  <option value="BBA Regular">BBA Regular</option>
                  <option value="BBA + Aviation">BBA + Aviation</option>
                  <option value="BBA + US - CMA">BBA + US - CMA</option>
                  <option value="BBA + CMA">BBA + CMA</option>
                  <option value="BBA + UK-ACCA">BBA + UK-ACCA</option>
                  <option value="BBA + CS">BBA + CS</option>
                  <option value="BBA + SAP">BBA + SAP</option>
                  <option value="BBA + KPMG Certified Accounting Program">BBA + KPMG Certified Accounting Program</option>
                  <option value="BCA Regular">BCA Regular</option>
                  <option value="BCA + Artificial Intelligence">BCA + Artificial Intelligence</option>
                  <option value="BCA + Data Science">BCA + Data Science</option>
                  <option value="BCA + Cloud Computing">BCA + Cloud Computing</option>
                  <option value="BCA + Cyber Security">BCA + Cyber Security</option>
                  <option value="MBA">MBA</option>
                  <option value="MCA">MCA</option>
                  <option value="MCOM">MCOM</option>
                </select>
              </div>

              
              <div className="mb-3 mt-3 flex items-start justify-center">
                <input
                  id="checkBox"
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mr-2 mt-2"
                  required
                />
                <label htmlFor="checkBox" className="text-gray-700 text-md">
                  I Authorise Nagarjuna Degree College and its representatives to contact me with updates and notifications and email, SMS, WhatsApp, and Call. This will override the registry on DND/NDNC
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0E2455] text-white py-2 rounded flex justify-center items-center"
                disabled={loading} // Disable button while submitting
              >
                {loading ? (
                  <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>

            </form>

            {message && (
              <div
                className={`mt-4 p-3 text-center rounded-md font-medium ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>
      )} */}
    </>
  );
}

const FormInput = ({ label, name, value, handleChange, required = false, error = "", maxLength = undefined }: any) => (
  <div className="mb-3">
    <label className="block text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={label}
      maxLength={maxLength}
      className={`w-full border px-3 py-1 rounded ${error ? "border-red-500" : "border-gray-300"}`}
      required={required}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);