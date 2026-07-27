const mongoose = require("mongoose");

// One document per activity cell/forum (16 total). cellId matches the
// frontend route slug (not always the same as the old CMS endpoint slug —
// see seed/activityCellMap.js for the 4 known mismatches).
const activityCellSchema = new mongoose.Schema(
  {
    cellId: { type: String, required: true, unique: true },
    group: { type: String, required: true }, // one of the 3 groupings used in src/app/activities
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model("ActivityCell", activityCellSchema);
