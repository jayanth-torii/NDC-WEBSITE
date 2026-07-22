"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

  return (
    <div className="p-6 bg-white mt-10 mb-20">
      <h2 className="text-2xl font-bold text-[#003333] mb-6">COMMENTS</h2>

      {/* Tab Navigation */}
      <div className="flex -inset-1 border-b border-gray-300 mb-6">
        <button
          className={`py-2 px-4 font-semibold ${activeTab === "add" ? "border-b-4 border-[#F09300] text-black" : "text-gray-600"}`}
          onClick={() => setActiveTab("add")}
        >
          Add Comment
        </button>
        <button
          className={`py-2 px-4 font-semibold ${activeTab === "view" ? "border-b-4 border-[#F09300] text-black" : "text-gray-600"}`}
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
              <label className="block text-sm font-medium">Enter Your Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium">Enter Your E-Mail ID<span className="text-red-500">*</span></label>
              <input
                type="email"
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-sm font-medium">Enter Your Comment Below</label>
            <textarea
              {...register("comment", { required: "Comment cannot be empty" })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            ></textarea>
            {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
          </div>

          <button type="submit" className="px-9 py-3 bg-[#0E2455] text-white text-sm sm:text-md transition hover:bg-[#092034]">
            ADD COMMENT
          </button>
        </form>
      )}

      {/* View Comments Section */}
      {activeTab === "view" && (
        <div className="space-y-4">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg">
                <p className="font-semibold">{comment.name} - <span className="text-gray-500 text-sm">{comment.date}</span></p>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments yet for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
