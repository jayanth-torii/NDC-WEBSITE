const express = require("express");
const controller = require("../../controllers/applyNowForm/controller");
const { authenticate, requireAdmin } = require("../../middleware/auth");
const { applyNowValidators } = require("../../validators/formValidators");

const router = express.Router();

router.post("/", applyNowValidators, controller.create);
router.get("/", authenticate, requireAdmin, controller.list);
router.patch("/:id/read", authenticate, requireAdmin, controller.markRead);

module.exports = router;
