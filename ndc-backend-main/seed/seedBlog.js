const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { DATA_EXPORT_ROOT } = require("./dataExportPath");
const { rewriteAssetPaths } = require("../src/utils/rewriteAssetPaths");

async function seedBlog() {
  const Blog = mongoose.model("Blog");
  const file = path.join(DATA_EXPORT_ROOT, "blog", "data.json");
  const json = JSON.parse(fs.readFileSync(file, "utf8"));
  const blogs = json["blogs-content"].data.blogs || [];

  let count = 0;
  for (const item of blogs) {
    await Blog.findOneAndUpdate(
      { postId: item.id },
      {
        postId: item.id,
        title: item.title,
        description: item.description || "",
        blogImage: rewriteAssetPaths(item.blogImage || ""),
        content: item.content || [],
        order: item.id,
        isActive: true,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    count++;
  }
  console.log(`Seeded ${count} blog posts.`);
}

module.exports = { seedBlog };
