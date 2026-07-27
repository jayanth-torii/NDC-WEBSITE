const ContactUsSubmission = require("../../models/contactUsForm/model");
const { asyncHandler } = require("../../middleware/errorHandler");
const { notify } = require("../../utils/mailer");

const create = asyncHandler(async (req, res) => {
  const { fullName, mobileNumber, email, subjectOfInterest, message } = req.body;
  const submission = await ContactUsSubmission.create({ fullName, mobileNumber, email, subjectOfInterest, message });
  notify("New Contact Us submission", `${fullName} (${email}, ${mobileNumber}) — ${subjectOfInterest}\n\n${message}`);
  res.status(201).json({ success: true, data: submission });
});

const list = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const [items, total] = await Promise.all([
    ContactUsSubmission.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    ContactUsSubmission.countDocuments({}),
  ]);
  res.json({ success: true, data: items, total, page, limit });
});

const markRead = asyncHandler(async (req, res) => {
  const submission = await ContactUsSubmission.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  res.json({ success: true, data: submission });
});

module.exports = { create, list, markRead };
