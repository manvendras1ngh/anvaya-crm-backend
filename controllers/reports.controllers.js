import { Lead } from "../models/leads.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// Get leads closed in the last week
export const getLeadsClosedLastWeek = asyncWrapper(async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const closedLeads = await Lead.find({
    status: "Closed",
    closedAt: { $gte: oneWeekAgo },
  }).populate("salesAgent", "name");

  const formattedLeads = closedLeads.map((lead) => ({
    id: lead._id,
    name: lead.name,
    salesAgent: lead.salesAgent.name,
    closedAt: lead.closedAt,
  }));

  res.status(200).json(formattedLeads);
});

// Get total leads in pipeline (excluding closed leads)
export const getTotalLeadsInPipeline = asyncWrapper(async (req, res) => {
  const [totalClosedLeads, totalNonClosedLeads] = await Promise.all([
    Lead.countDocuments({ status: { $ne: "Closed" } }),
    Lead.countDocuments({ status: "Closed" }),
  ]);

  res.status(200).json({ totalClosedLeads, totalNonClosedLeads });
});
