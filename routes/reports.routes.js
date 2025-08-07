import express from "express";
import {
  getLeadsClosedLastWeek,
  getTotalLeadsInPipeline,
} from "../controllers/reports.controllers.js";

const router = express.Router();

// Report routes
router.get("/last-week", getLeadsClosedLastWeek);
router.get("/pipeline", getTotalLeadsInPipeline);

export default router;