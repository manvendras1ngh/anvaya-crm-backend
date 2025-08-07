import { Lead } from "../models/leads.models.js";
import { SalesAgent } from "../models/salesAgents.models.js";
import { Comment } from "../models/comments.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";

import { mockLeads } from "../utils/data.js";

// Add leads in bulk
export const addBulkLeads = asyncWrapper(async (req, res) => {
  const newLeads = mockLeads.map((lead) => ({
    name: lead.name,
    source: lead.source,
    salesAgent: lead.salesAgent,
    status: lead.status,
    tags: lead.tags,
    timeToClose: lead.timeToClose,
    priority: lead.priority,
    closedAt: lead.closedAt,
  }));

  const insertedLeads = await Lead.insertMany(newLeads);

  res.status(201).json({
    message: `Added ${insertedLeads.length} leads in database`,
    data: insertedLeads,
  });
});

// Create a new lead
export const createLead = asyncWrapper(async (req, res) => {
  const { name, source, salesAgent, status, tags, timeToClose, priority } =
    req.body;

  // Validate if sales agent exists
  const agent = await SalesAgent.findById(salesAgent);
  if (!agent) {
    return res.status(404).json({
      error: `Sales agent with ID '${salesAgent}' not found.`,
    });
  }

  const lead = new Lead({
    name,
    source,
    salesAgent,
    status,
    tags,
    timeToClose,
    priority,
  });

  const savedLead = await lead.save();

  // Populate sales agent details
  await savedLead.populate("salesAgent", "name");

  res.status(201).json({
    id: savedLead._id,
    name: savedLead.name,
    source: savedLead.source,
    salesAgent: {
      id: savedLead.salesAgent._id,
      name: savedLead.salesAgent.name,
    },
    status: savedLead.status,
    tags: savedLead.tags,
    timeToClose: savedLead.timeToClose,
    priority: savedLead.priority,
    createdAt: savedLead.createdAt,
    updatedAt: savedLead.updatedAt,
  });
});

// Get all leads with optional filtering
export const getAllLeads = asyncWrapper(async (req, res) => {
  const { salesAgent, status, tags, source } = req.query;

  // Build filter object
  const filter = {};
  if (salesAgent) filter.salesAgent = salesAgent;
  if (status) filter.status = status;
  if (source) filter.source = source;
  if (tags) filter.tags = { $in: tags.split(",") };

  const leads = await Lead.find(filter).populate("salesAgent", "name");

  const formattedLeads = leads.map((lead) => ({
    id: lead._id,
    name: lead.name,
    source: lead.source,
    salesAgent: {
      id: lead.salesAgent._id,
      name: lead.salesAgent.name,
    },
    status: lead.status,
    tags: lead.tags,
    timeToClose: lead.timeToClose,
    priority: lead.priority,
    createdAt: lead.createdAt,
  }));

  res.status(200).json(formattedLeads);
});

// Update a lead
export const updateLead = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, source, salesAgent, status, tags, timeToClose, priority } =
    req.body;

  // Check if lead exists
  const lead = await Lead.findById(id);
  if (!lead) {
    return res.status(404).json({
      error: `Lead with ID '${id}' not found.`,
    });
  }

  // Validate if sales agent exists
  const agent = await SalesAgent.findById(salesAgent);
  if (!agent) {
    return res.status(404).json({
      error: `Sales agent with ID '${salesAgent}' not found.`,
    });
  }

  const updateData = {
    name,
    source,
    salesAgent,
    status,
    tags,
    timeToClose,
    priority,
  };

  if (status === "Closed" && lead.status !== "Closed") {
    updateData.closedAt = new Date();
  }

  const updatedLead = await Lead.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate("salesAgent", "name");

  res.status(200).json({
    id: updatedLead._id,
    name: updatedLead.name,
    source: updatedLead.source,
    salesAgent: {
      id: updatedLead.salesAgent._id,
      name: updatedLead.salesAgent.name,
    },
    status: updatedLead.status,
    tags: updatedLead.tags,
    timeToClose: updatedLead.timeToClose,
    priority: updatedLead.priority,
    updatedAt: updatedLead.updatedAt,
  });
});

// Delete a lead
export const deleteLead = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) {
    return res.status(404).json({
      error: `Lead with ID '${id}' not found.`,
    });
  }

  res.status(200).json({
    message: "Lead deleted successfully.",
  });
});

// Add a comment to a lead
export const addCommentToLead = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { commentText, author } = req.body;

  // Check if lead exists
  const lead = await Lead.findById(id);
  if (!lead) {
    return res.status(404).json({
      error: `Lead with ID '${id}' not found.`,
    });
  }

  // Validate if author (sales agent) exists
  const agent = await SalesAgent.findById(author);
  if (!agent) {
    return res.status(404).json({
      error: `Sales agent with ID '${author}' not found.`,
    });
  }

  const comment = new Comment({
    lead: id,
    author,
    commentText,
  });

  const savedComment = await comment.save();
  await savedComment.populate("author", "name");

  res.status(201).json({
    id: savedComment._id,
    commentText: savedComment.commentText,
    author: savedComment.author.name,
    createdAt: savedComment.createdAt,
  });
});

// Get all comments for a lead
export const getCommentsForLead = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  // Check if lead exists
  const lead = await Lead.findById(id);
  if (!lead) {
    return res.status(404).json({
      error: `Lead with ID '${id}' not found.`,
    });
  }

  const comments = await Comment.find({ lead: id })
    .populate("author", "name")
    .sort({ createdAt: 1 });

  const formattedComments = comments.map((comment) => ({
    id: comment._id,
    commentText: comment.commentText,
    author: comment.author.name,
    createdAt: comment.createdAt,
  }));

  res.status(200).json(formattedComments);
});
