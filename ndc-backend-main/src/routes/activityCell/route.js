const express = require("express");
const controller = require("../../controllers/activityCell/controller");
const { authenticate, requireAdmin } = require("../../middleware/auth");

const router = express.Router();

router.get("/", controller.list);
router.get("/:cellId", controller.getByCellId);
router.put("/:cellId", authenticate, requireAdmin, controller.upsert);

module.exports = router;
