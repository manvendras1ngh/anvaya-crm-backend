import express from "express";
import {
  createLead,
  getAllLeads,
  updateLead,
  deleteLead,
  addCommentToLead,
  getCommentsForLead,
  addBulkLeads,
} from "../controllers/leads.controllers.js";

const router = express.Router();

// Lead routes
router.post("/add/bulk", addBulkLeads);
router.post("/", createLead);
router.get("/", getAllLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

// Comment routes for leads
router.post("/:id/comments", addCommentToLead);
router.get("/:id/comments", getCommentsForLead);

export default router;
