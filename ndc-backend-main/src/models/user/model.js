const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  { page: String, read: { type: Boolean, default: true }, write: { type: Boolean, default: false } },
  { _id: false }
);

// Kept intentionally simple relative to NCET's 6-role matrix: NDC has one
// maintainer today. `permissions` is included but unused for now so a future
// second editor doesn't require a schema migration.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "editor" },
    permissions: { type: [permissionSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
