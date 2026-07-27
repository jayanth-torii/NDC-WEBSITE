// Dev-only: starts an in-memory MongoDB, seeds it, then boots the real
// Express app against it and keeps running so HTTP endpoints can be curled.
// Not part of the running app or CI.
require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

async function main() {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  process.env.PORT = process.env.VERIFY_PORT || "5099";

  await mongoose.connect(process.env.MONGO_URI);
  const { loadAllModels } = require("../seed/loadModels");
  loadAllModels();

  const fs = require("fs");
  const path = require("path");
  const { DATA_EXPORT_ROOT } = require("../seed/dataExportPath");
  const manifest = require("../seed/manifest");
  const { seedBlog } = require("../seed/seedBlog");
  const { seedActivityCells } = require("../seed/seedActivityCells");
  const { seedLibrary } = require("../seed/seedLibrary");
  const { rewriteAssetPaths } = require("../src/utils/rewriteAssetPaths");

  function extract(entry, json) {
    const raw = json[entry.endpointKey];
    if (!raw) return undefined;
    let data = raw.data;
    if (entry.unwrapArray && Array.isArray(data)) data = data[0];
    if (entry.pick) data = data ? data[entry.pick] : undefined;
    return rewriteAssetPaths(data);
  }
  for (const entry of manifest) {
    const Model = mongoose.model(entry.model);
    const file = path.join(DATA_EXPORT_ROOT, ...entry.file.split("/"));
    if (!fs.existsSync(file)) continue;
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    const data = extract(entry, json);
    if (data === undefined) continue;
    await Model.findOneAndUpdate({}, { data }, { upsert: true, new: true, setDefaultsOnInsert: true });
  }
  await seedBlog();
  await seedActivityCells();
  await seedLibrary();

  const User = mongoose.model("User");
  const password = await bcrypt.hash("Test1234!", 10);
  await User.create({ name: "Test Admin", email: "test-admin@example.com", password, role: "admin" });

  await mongoose.disconnect();

  console.log("VERIFY_MONGO_URI=" + process.env.MONGO_URI);
  console.log("VERIFY_PORT=" + process.env.PORT);

  // Boot the real app (its own connectDB call reconnects using the same URI).
  require("../app");
}

main().catch((err) => {
  console.error("SETUP FAILED:", err);
  process.exit(1);
});
