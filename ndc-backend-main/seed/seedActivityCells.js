const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const activityCellMap = require("./activityCellMap");
const { DATA_EXPORT_ROOT } = require("./dataExportPath");
const { rewriteAssetPaths } = require("../src/utils/rewriteAssetPaths");

async function seedActivityCells() {
  const ActivityCell = mongoose.model("ActivityCell");
  let count = 0;
  for (const row of activityCellMap) {
    const file = path.join(DATA_EXPORT_ROOT, ...row.file.split("/"));
    if (!fs.existsSync(file)) {
      console.warn(`Skipping ${row.routeSlug}: ${row.file} not found`);
      continue;
    }
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    const payload = json[row.endpointSlug];
    if (!payload) {
      console.warn(`Skipping ${row.routeSlug}: endpoint key "${row.endpointSlug}" not found in ${row.file}`);
      continue;
    }
    await ActivityCell.findOneAndUpdate(
      { cellId: row.routeSlug },
      { cellId: row.routeSlug, group: row.group, data: rewriteAssetPaths(payload.data) },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    count++;
  }
  console.log(`Seeded ${count} activity cells.`);
}

module.exports = { seedActivityCells };
