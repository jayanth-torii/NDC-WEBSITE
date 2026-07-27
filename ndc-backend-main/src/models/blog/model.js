const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    postId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    blogImage: { type: String, default: "" },
    content: { type: [String], default: [] },
    order: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

blogSchema.pre("validate", function setDefaultOrder(next) {
  if (this.order === undefined) this.order = this.postId;
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
