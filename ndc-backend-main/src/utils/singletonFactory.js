const express = require("express");
const { asyncHandler } = require("../middleware/errorHandler");
const { authenticate, requireAdmin } = require("../middleware/auth");

// Shared CRUD for "one document = one whole page" models. GET is public;
// PUT upserts the single document (create-or-update, matching NCET's Iqac pattern).
function createSingletonController(Model) {
  return {
    getOne: asyncHandler(async (req, res) => {
      const doc = await Model.findOne({});
      res.json({ success: true, data: doc ? doc.data : null });
    }),
    upsert: asyncHandler(async (req, res) => {
      const doc = await Model.findOneAndUpdate(
        {},
        { data: req.body },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      res.json({ success: true, data: doc.data });
    }),
  };
}

function createSingletonRouter(Model) {
  const router = express.Router();
  const controller = createSingletonController(Model);
  router.get("/", controller.getOne);
  router.put("/", authenticate, requireAdmin, controller.upsert);
  return router;
}

module.exports = { createSingletonController, createSingletonRouter };
