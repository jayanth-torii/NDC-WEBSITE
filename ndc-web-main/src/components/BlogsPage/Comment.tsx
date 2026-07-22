"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

interface Comment {
  name: string;
  email: string;
  comment: string;
  category: string;
  date: string;
}

const Comments = ({ selectedTabs }: { selectedTabs: string[] }) => {
  const [activeTab, setActiveTab] = useState("add"); // Tabs: "add" or "view"
  const [comments, setComments] = useState<Comment[]>([]); // Stores comments
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Form Handling with React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Comment, "date">>(); // Exclude "date" from form fields

  // Handles form submission
  const onSubmit = (data: Omit<Comment, "date">) => {
    if (!captchaVerified) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }

    // Get the first selected category (default to "All" if none)
    const category = selectedTabs.length > 0 && !selectedTabs.includes("All") ? selectedTabs[0] : "All";

    const newComment = { ...data, category, date: new Date().toLocaleString() };
    setComments([newComment, ...comments]); // Add new comment to state
    reset(); // Clear form
    setCaptchaVerified(false); // Reset CAPTCHA
  };

  // Filter comments based on selected tabs
  const filteredComments = selectedTabs.includes("All")
    ? comments
    : comments.filter((comment) => selectedTabs.includes(comment.category));

  const inputClasses =
    "w-full px-3 py-2.5 rounded-[10px] border border-card-border bg-white text-navy transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange";

  return (
    <div className="rounded-[18px] border border-card-border bg-white p-6 shadow-[var(--shadow-card)] mt-10 mb-20">
      <SectionHeading title="COMMENTS" className="mb-6" />

      {/* Tab Navigation */}
      <div className="flex border-b border-card-border mb-6">
        <button
          type="button"
          className={`py-2 px-4 font-semibold transition-colors ${activeTab === "add" ? "border-b-4 border-orange text-navy" : "text-body-gray hover:text-navy"}`}
          onClick={() => setActiveTab("add")}
        >
          Add Comment
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-semibold transition-colors ${activeTab === "view" ? "border-b-4 border-orange text-navy" : "text-body-gray hover:text-navy"}`}
          onClick={() => setActiveTab("view")}
        >
          View Comments
        </button>
      </div>

      {/* Add Comment Form */}
      {activeTab === "add" && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Enter Your Name<span className="text-orange">*</span></label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={inputClasses}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Enter Your E-Mail ID<span className="text-orange">*</span></label>
              <input
                type="email"
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                className={inputClasses}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Enter Your Comment Below</label>
            <textarea
              {...register("comment", { required: "Comment cannot be empty" })}
              rows={4}
              className={inputClasses}
            ></textarea>
            {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
          </div>

          <Button type="submit" variant="primary">
            ADD COMMENT
          </Button>
        </form>
      )}

      {/* View Comments Section */}
      {activeTab === "view" && (
        <div className="space-y-4">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment, index) => (
              <div key={index} className="p-4 rounded-[14px] border border-card-border bg-surface-light">
                <p className="font-semibold text-navy">{comment.name} - <span className="text-body-gray text-sm">{comment.date}</span></p>
                <p className="text-body-gray mt-1">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-body-gray">No comments yet for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
