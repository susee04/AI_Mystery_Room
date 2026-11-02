const mongoose = require("mongoose");

const suspectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  age: Number,
  description: { type: String, required: true },
  relationship: { type: String, required: true },
  motive: { type: String, required: true },
  background: { type: String, default: "" },
}, { _id: false });

const clueSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  importance: { type: String, default: "medium" },
  isDiscovered: { type: Boolean, default: false },
}, { _id: false });

const evidenceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ["text", "message", "cctv", "image", "witness", "document", "object"], required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  content: { type: String, required: true },
  timestamp: { type: String, default: "" },
  location: { type: String, default: "" },
}, { _id: false });

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  premise: { type: String, required: true, maxlength: 500 },
  story: { type: String, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  suspects: { type: [suspectSchema], required: true },
  clues: { type: [clueSchema], required: true },
  hints: [{ id: String, text: String }],
  evidence: { type: [evidenceSchema], required: true },
  culprit: { type: String, required: true, select: false },
  solution: { type: String, required: true, select: false },
  supportingEvidence: { type: [String], default: [], select: false },
  playerProgress: {
    discoveredClues: { type: [String], default: [] },
    hintsUsed: { type: Number, default: 0 },
    currentStage: { type: String, default: "investigation" },
  },
  accusation: {
    suspectId: { type: String, default: null },
    submittedAt: { type: Date, default: null },
    correct: { type: Boolean, default: null },
  },
  score: { type: Number, default: 0, min: 0 },
  status: { type: String, enum: ["active", "completed"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Case", caseSchema);
