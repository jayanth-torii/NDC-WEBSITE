const Blog = require("../../models/blog/model");
const { asyncHandler } = require("../../middleware/errorHandler");

const list = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: blogs });
});

const getByPostId = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ postId: Number(req.params.postId) });
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  res.json({ success: true, data: blog });
});

const create = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({ success: true, data: blog });
});

const update = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate({ postId: Number(req.params.postId) }, req.body, { new: true });
  if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
  res.json({ success: true, data: blog });
});

const remove = asyncHandler(async (req, res) => {
  await Blog.deleteOne({ postId: Number(req.params.postId) });
  res.json({ success: true });
});

module.exports = { list, getByPostId, create, update, remove };
