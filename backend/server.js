require("dotenv").config();
// Optional local workaround for networks whose DNS cannot resolve Atlas SRV records.
if (process.env.DNS_SERVERS) {
  require("node:dns").setServers(
    process.env.DNS_SERVERS.split(",").map((value) => value.trim()).filter(Boolean)
  );
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/items", itemRoutes);

app.use((error, req, res, next) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body must be valid JSON" });
  }
  console.error("Request failed:", error.name);
  res.status(500).json({ message: "Server error. Check backend terminal or logs." });
});

async function start() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing. Create backend/.env using .env.example.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    const port = process.env.PORT || 5000;
    app.listen(port, "0.0.0.0", () => console.log(`Backend running on port ${port}`));
  } catch (error) {
    console.error("Database connection failed. Check credentials, URI and Atlas IP access list.");
    console.error("Error type:", error.name);
    process.exit(1);
  }
}

start();
