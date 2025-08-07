import express from "express";
import {
  createSalesAgent,
  getAllSalesAgents,
} from "../controllers/agents.controllers.js";

const router = express.Router();

// Sales agent routes
router.post("/", createSalesAgent);
router.get("/", getAllSalesAgents);

export default router;