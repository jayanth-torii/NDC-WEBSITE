const ApplyNowSubmission = require("../../models/applyNowForm/model");
const { asyncHandler } = require("../../middleware/errorHandler");
const { notify } = require("../../utils/mailer");

const create = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber, email, course } = req.body;
  const submission = await ApplyNowSubmission.create({ fullName, phoneNumber, email, course });
  notify("New Apply Now submission", `${fullName} (${email}, ${phoneNumber}) — ${course}`);
  res.status(201).json({ success: true, data: submission });
});

const list = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const [items, total] = await Promise.all([
    ApplyNowSubmission.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    ApplyNowSubmission.countDocuments({}),
  ]);
  res.json({ success: true, data: items, total, page, limit });
});

const markRead = asyncHandler(async (req, res) => {
  const submission = await ApplyNowSubmission.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  res.json({ success: true, data: submission });
});

module.exports = { create, list, markRead };
