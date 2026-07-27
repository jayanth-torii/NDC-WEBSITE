const express = require("express");
const controller = require("../../controllers/contactUsForm/controller");
const { authenticate, requireAdmin } = require("../../middleware/auth");
const { contactUsValidators } = require("../../validators/formValidators");

const router = express.Router();

router.post("/", contactUsValidators, controller.create);
router.get("/", authenticate, requireAdmin, controller.list);
router.patch("/:id/read", authenticate, requireAdmin, controller.markRead);

module.exports = router;
