const express = require("express");
const { upload } = require("../utils/upload");
const { authenticate, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticate, requireAdmin, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  res.json({ success: true, data: { url: req.file.location, key: req.file.key } });
});

module.exports = router;
