"use client";

import { useState } from "react";
import { submitContactUs } from "@/services/data.service";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

const QueryForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    subjectOfInterest: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({
    mobileNumber: "",
    email: "",
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Mobile Number Validation
    if (name === "mobileNumber") {
      if (!/^[0-9]{10}$/.test(value)) {
        setErrors((prev) => ({ ...prev, mobileNumber: "Enter a valid 10-digit number" }));
      } else {
        setErrors((prev) => ({ ...prev, mobileNumber: "" }));
      }
    }

    // Email Validation
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Final validation before submission
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      showMessage("Please enter a valid 10-digit mobile number.", "error");
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showMessage("Please enter a valid email address.", "error");
      setLoading(false);
      return;
    }

    const { consent, ...formDataToSend } = formData;

    try {
      await submitContactUs(formDataToSend);

      showMessage("Form submitted successfully!", "success");

      setFormData({
        fullName: "",
        mobileNumber: "",
        email: "",
        subjectOfInterest: "",
        message: "",
        consent: false,
      });
      setErrors({ mobileNumber: "", email: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      showMessage("An error occurred while submitting the form.", "error");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const inputClasses =
    "w-full mt-1 mb-5 p-2.5 rounded-[10px] border border-card-border bg-white text-navy transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange";
  const errorInputClasses =
    "w-full mt-1 p-2.5 mb-5 rounded-[10px] border border-red-400 bg-white text-navy transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange";

  return (
    <div className="mx-auto h-full p-6 rounded-[24px] border border-card-border bg-white sm:p-8 lg:p-10">
      <SectionHeading eyebrow="We'd love to hear from you" title="Submit Your Query" className="mb-8" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
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
            className={inputClasses}
          />
        </div>

        {/* Mobile Number & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-navy font-medium">
              Enter Your Mobile Number <span className="text-orange">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className={errors.mobileNumber ? errorInputClasses : inputClasses}
              maxLength={10}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
            )}
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
              className={errors.email ? errorInputClasses : inputClasses}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-navy font-medium">Subject Of Interest</label>
          <input
            type="text"
            name="subjectOfInterest"
            value={formData.subjectOfInterest}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Query Description */}
        <div>
          <label className="block text-navy font-medium">Short Description of Related Query</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={inputClasses}
          ></textarea>
        </div>

        {/* Consent Checkbox */}
        <div className="mb-5 mt-5 flex items-start">
          <input
            id="checkBox"
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mr-2 mt-2 accent-orange"
            required
          />
          <label htmlFor="checkBox" className="text-navy font-medium">
            I Authorise Nagarjuna Degree College and its representatives to contact me with updates and notifications via email, SMS, WhatsApp, and Call.
          </label>
        </div>

        {/* Submit Button with Loading Spinner */}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full justify-center py-5 text-xl"
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : (
            "Submit Request"
          )}
        </Button>

        {/* Display Message Below Button */}
        {message && (
          <div className={`mt-4 p-3 text-xl font-medium text-center rounded-[10px] ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default QueryForm;
