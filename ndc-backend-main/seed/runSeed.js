require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const { loadAllModels } = require("./loadModels");
const { DATA_EXPORT_ROOT } = require("./dataExportPath");
const manifest = require("./manifest");
const { seedBlog } = require("./seedBlog");
const { seedActivityCells } = require("./seedActivityCells");
const { seedLibrary } = require("./seedLibrary");
const { rewriteAssetPaths } = require("../src/utils/rewriteAssetPaths");

function extract(entry, json) {
  const raw = json[entry.endpointKey];
  if (!raw) return undefined;
  let data = raw.data;
  if (entry.unwrapArray && Array.isArray(data)) data = data[0];
  if (entry.pick) data = data ? data[entry.pick] : undefined;
  return rewriteAssetPaths(data);
}

async function seedSingletons() {
  let count = 0;
  for (const entry of manifest) {
    const Model = mongoose.model(entry.model);
    const file = path.join(DATA_EXPORT_ROOT, ...entry.file.split("/"));
    if (!fs.existsSync(file)) {
      console.warn(`Skipping ${entry.model}: file not found (${entry.file})`);
      continue;
    }
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    const data = extract(entry, json);
    if (data === undefined) {
      console.warn(`Skipping ${entry.model}: endpoint key "${entry.endpointKey}" missing in ${entry.file}`);
      continue;
    }
    await Model.findOneAndUpdate({}, { data }, { upsert: true, new: true, setDefaultsOnInsert: true });
    count++;
  }
  console.log(`Seeded ${count}/${manifest.length} singleton models.`);
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for seeding.");
  loadAllModels();

  await seedSingletons();
  await seedBlog();
  await seedActivityCells();
  await seedLibrary();

  await mongoose.disconnect();
  console.log("Seed complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
