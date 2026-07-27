"use client";

import { useState } from "react";
import { submitApplyNow } from "@/services/data.service";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

const QueryForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    course: "", // Added for the dropdown
    consent: false,
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    email: "",
    course: "", // Validation for dropdown
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "course" && value) {
      setErrors((prev) => ({ ...prev, course: "" })); // Clear error on selection
    }

    if (name === "phoneNumber" && !/^[0-9]{10}$/.test(value)) {
      setErrors((prev) => ({ ...prev, phoneNumber: "Enter a valid 10-digit number" }));
    } else if (name === "phoneNumber") {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }));
    }

    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.course) {
      setErrors((prev) => ({ ...prev, course: "Please select a course" }));
      setLoading(false);
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      showMessage("Please enter a valid 10-digit mobile number.", "error");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.", "error");
      setLoading(false);
      return;
    }

    const { consent, ...data } = formData;

    try {
      await submitApplyNow(data);

      showMessage("Form submitted successfully!", "success");

      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        course: "",
        consent: false,
      });
      setErrors({ phoneNumber: "", email: "", course: "" });
    } catch (error) {
      showMessage("An error occurred while submitting the form.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="mx-auto p-6 sm:p-8 bg-white border border-card-border shadow-[var(--shadow-card)] rounded-2xl mb-20">
      <SectionHeading title="SUBMIT YOUR QUERY HERE" align="left" className="mb-8" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-navy font-medium">
            Enter Your Full Name <span className="text-orange">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full mt-1 mb-5 p-3 border border-card-border rounded-xl outline-none transition-colors duration-200 focus:ring-2 focus:ring-orange focus:border-orange"
          />
        </div>

        <div>
          <div>
            <label className="block text-navy font-medium">
              Enter Your Mobile Number <span className="text-orange">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className={`w-full mt-1 p-3 border mb-5 ${errors.phoneNumber ? "border-red-500" : "border-card-border"} rounded-xl outline-none transition-colors duration-200 focus:ring-2 focus:ring-orange focus:border-orange`}
              maxLength={10}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block text-navy font-medium">
              Enter Your E-Mail ID <span className="text-orange">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full mt-1 p-3 border mb-5 ${errors.email ? "border-red-500" : "border-card-border"} rounded-xl outline-none transition-colors duration-200 focus:ring-2 focus:ring-orange focus:border-orange`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-navy font-medium">
            Programs Offered <span className="text-orange">*</span>
          </label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className={`w-full mt-1 p-3 border mb-5 ${errors.course ? "border-red-500" : "border-card-border"} rounded-xl outline-none transition-colors duration-200 focus:ring-2 focus:ring-orange focus:border-orange`}
          >
            <option value="" disabled>
              Select a course
            </option>
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
          {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full !py-4 text-lg"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : (
            "Register Request"
          )}
        </Button>
      </form>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mt-4 p-3 text-center rounded-md font-medium ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default QueryForm;
