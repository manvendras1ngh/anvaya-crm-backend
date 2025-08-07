import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { instantiateConnection } from "./db/db.connect.js";

import leadRoutes from "./routes/leads.routes.js";
import agentRoutes from "./routes/agents.routes.js";
import reportRoutes from "./routes/reports.routes.js";

//config
dotenv.config({ path: "./.env" });
const app = express();
const PORT = process.env.PORT || 3000;

//connect to db
try {
  await instantiateConnection();
} catch (error) {
  throw error;
}

//settings
app.use(express.json({ limit: "16kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//user defined routes
app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/agents", agentRoutes);
app.use("/api/v1/reports", reportRoutes);

//home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is hot and ready to serve!" });
});

//error route
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: "Internal server error!", error: error.message });
});

//active port
app.listen(PORT, () => {
  console.log("Server is hot");
});
