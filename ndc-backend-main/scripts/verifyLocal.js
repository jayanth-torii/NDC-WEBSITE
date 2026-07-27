// Dev-only verification harness: spins up an ephemeral in-memory MongoDB,
// seeds it from data-export, runs a handful of read/write checks, then tears
// down. Not part of the running app or CI — a one-off sanity check.
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { loadAllModels } = require("../seed/loadModels");
const manifest = require("../seed/manifest");

async function main() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log("In-memory MongoDB started at", uri);

  await mongoose.connect(uri);
  loadAllModels();

  // Re-implement the seed steps inline (against this URI) rather than
  // shelling out, so everything runs in one process/connection.
  process.env.MONGO_URI = uri;
  const fs = require("fs");
  const path = require("path");
  const { DATA_EXPORT_ROOT } = require("../seed/dataExportPath");
  const { seedBlog } = require("../seed/seedBlog");
  const { seedActivityCells } = require("../seed/seedActivityCells");

  function extract(entry, json) {
    const raw = json[entry.endpointKey];
    if (!raw) return undefined;
    let data = raw.data;
    if (entry.unwrapArray && Array.isArray(data)) data = data[0];
    if (entry.pick) data = data ? data[entry.pick] : undefined;
    return data;
  }

  let seeded = 0;
  let skipped = [];
  for (const entry of manifest) {
    const Model = mongoose.model(entry.model);
    const file = path.join(DATA_EXPORT_ROOT, ...entry.file.split("/"));
    if (!fs.existsSync(file)) {
      skipped.push(`${entry.model} (file missing: ${entry.file})`);
      continue;
    }
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    const data = extract(entry, json);
    if (data === undefined) {
      skipped.push(`${entry.model} (endpoint key missing: ${entry.endpointKey})`);
      continue;
    }
    await Model.findOneAndUpdate({}, { data }, { upsert: true, new: true, setDefaultsOnInsert: true });
    seeded++;
  }
  console.log(`Seeded ${seeded}/${manifest.length} singleton models.`);
  if (skipped.length) console.log("Skipped:\n  " + skipped.join("\n  "));

  await seedBlog();
  await seedActivityCells();

  // Seed one admin account
  const User = mongoose.model("User");
  const password = await bcrypt.hash("Test1234!", 10);
  await User.create({ name: "Test Admin", email: "test-admin@example.com", password, role: "admin" });
  console.log("Seeded 1 admin user.");

  // --- Verification checks ---
  console.log("\n--- Verification ---");
  const Home = mongoose.model("Home");
  const home = await Home.findOne({});
  console.log("Home doc exists:", !!home, "| has bannerSection-like key:", Object.keys(home.data || {}).length > 0);

  const Footer = mongoose.model("Footer");
  const footer = await Footer.findOne({});
  console.log("Footer contactInfo.email:", footer?.data?.contactInfo?.email);

  const VisionMission = mongoose.model("VisionMission");
  const vm = await VisionMission.findOne({});
  console.log("VisionMission programme keys:", Object.keys(vm?.data || {}));

  const Blog = mongoose.model("Blog");
  const blogCount = await Blog.countDocuments({});
  const firstBlog = await Blog.findOne({}).sort({ order: 1 });
  console.log("Blog count:", blogCount, "| first blog title:", firstBlog?.title);

  const ActivityCell = mongoose.model("ActivityCell");
  const cellCount = await ActivityCell.countDocuments({});
  const oneCell = await ActivityCell.findOne({ cellId: "eco-clubs" });
  console.log("ActivityCell count:", cellCount, "| eco-clubs doc found:", !!oneCell, "| group:", oneCell?.group);

  const foundAdmin = await User.findOne({ email: "test-admin@example.com" });
  const passwordOk = await bcrypt.compare("Test1234!", foundAdmin.password);
  console.log("Admin login password check:", passwordOk);

  await mongoose.disconnect();
  await mongod.stop();
  console.log("\nDone. In-memory MongoDB stopped.");
}

main().catch((err) => {
  console.error("VERIFY FAILED:", err);
  process.exit(1);
});
