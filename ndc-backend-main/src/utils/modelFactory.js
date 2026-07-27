const mongoose = require("mongoose");

// Default shape for pages whose content mirrors the old static JSON verbatim:
// one document, one Mixed `data` field. See DEVELOPER.md / plan for which
// modules intentionally use a structured schema instead of this factory.
function createSingletonModel(name) {
  const schema = new mongoose.Schema(
    { data: { type: mongoose.Schema.Types.Mixed, default: {} } },
    { timestamps: true, minimize: false }
  );
  return mongoose.model(name, schema);
}

module.exports = { createSingletonModel };
