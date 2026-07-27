const express = require("express");
const controller = require("../../controllers/blog/controller");
const { authenticate, requireAdmin } = require("../../middleware/auth");

const router = express.Router();

router.get("/", controller.list);
router.get("/:postId", controller.getByPostId);
router.post("/", authenticate, requireAdmin, controller.create);
router.put("/:postId", authenticate, requireAdmin, controller.update);
router.delete("/:postId", authenticate, requireAdmin, controller.remove);

module.exports = router;
