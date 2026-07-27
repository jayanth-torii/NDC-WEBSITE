require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/db");
const { notFound, errorHandler } = require("./src/middleware/errorHandler");
const globalRoutes = require("./src/routes/globalRoutes");

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => res.json({ success: true, status: "ok" }));
app.use("/api", globalRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`ndc-backend listening on :${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
