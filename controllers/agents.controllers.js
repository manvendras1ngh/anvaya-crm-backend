import { SalesAgent } from "../models/salesAgents.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";

// Create a new sales agent
export const createSalesAgent = asyncWrapper(async (req, res) => {
  const { name, email } = req.body;

  // Check if agent with email already exists
  const existingAgent = await SalesAgent.findOne({ email });
  if (existingAgent) {
    return res.status(409).json({
      error: `Sales agent with email '${email}' already exists.`,
    });
  }

  const salesAgent = new SalesAgent({
    name,
    email,
  });

  const savedAgent = await salesAgent.save();

  res.status(201).json({
    id: savedAgent._id,
    name: savedAgent.name,
    email: savedAgent.email,
    createdAt: savedAgent.createdAt,
  });
});

// Get all sales agents
export const getAllSalesAgents = asyncWrapper(async (req, res) => {
  const agents = await SalesAgent.find();

  const formattedAgents = agents.map(agent => ({
    id: agent._id,
    name: agent.name,
    email: agent.email,
  }));

  res.status(200).json(formattedAgents);
});