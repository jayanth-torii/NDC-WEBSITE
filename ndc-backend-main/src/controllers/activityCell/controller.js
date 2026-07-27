const ActivityCell = require("../../models/activityCell/model");
const { asyncHandler } = require("../../middleware/errorHandler");

const list = asyncHandler(async (req, res) => {
  const cells = await ActivityCell.find({});
  res.json({ success: true, data: cells });
});

const getByCellId = asyncHandler(async (req, res) => {
  const cell = await ActivityCell.findOne({ cellId: req.params.cellId });
  if (!cell) return res.status(404).json({ success: false, message: "Activity cell not found" });
  res.json({ success: true, data: cell.data });
});

const upsert = asyncHandler(async (req, res) => {
  const { group, data } = req.body;
  const cell = await ActivityCell.findOneAndUpdate(
    { cellId: req.params.cellId },
    { cellId: req.params.cellId, group, data },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json({ success: true, data: cell });
});

module.exports = { list, getByCellId, upsert };
