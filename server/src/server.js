const path = require("path");

// Resolve .env from the backend directory, independent of the process cwd.
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const caseRoutes = require("./routes/cases");

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",").map((origin) => origin.trim()).filter(Boolean);

app.use(cors({ origin: (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error("Origin is not allowed by CORS"));
} }));
app.use(express.json({ limit: "16kb" }));
app.get("/", (_req, res) => res.json({ message: "AI Mystery Room backend is running!" }));
app.get("/api/health", (_req, res) => res.json({ success: true, database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" }));
app.use("/api/cases", caseRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && "body" in error) return res.status(400).json({ success: false, message: "Invalid JSON request body" });
  if (error.name === "ValidationError") return res.status(400).json({ success: false, message: "The case data was invalid" });
  if (error.name === "MongoServerError") {
    console.error("Database operation failed:", error.message);
    return res.status(500).json({ success: false, message: "Database request failed" });
  }
  if (error.message === "Origin is not allowed by CORS") return res.status(403).json({ success: false, message: "Request origin is not allowed" });
  if (error.status && error.status < 500) return res.status(error.status).json({ success: false, message: error.message });
  console.error("Request failed:", error.message);
  return res.status(error.status || 500).json({ success: false, message: error.status === 502 ? error.message : "Something went wrong. Please try again." });
});

const PORT = process.env.PORT || 5000;
async function start() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected successfully!");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

if (require.main === module) start().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});

module.exports = app;
