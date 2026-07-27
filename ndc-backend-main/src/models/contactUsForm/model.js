const mongoose = require("mongoose");

const contactUsFormSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    subjectOfInterest: { type: String, default: "" },
    message: { type: String, default: "" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUsSubmission", contactUsFormSchema);
