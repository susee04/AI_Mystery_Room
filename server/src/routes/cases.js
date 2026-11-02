const express = require("express");
const mongoose = require("mongoose");
const Case = require("../models/Case");
const { DIFFICULTIES } = require("../config/gameRules");
const { generateMystery } = require("../services/caseService");

const router = express.Router();
const safeCase = (record) => ({
  id: record.id,
  title: record.title,
  premise: record.premise,
  story: record.story,
  difficulty: record.difficulty,
  suspects: record.suspects,
  clues: record.clues.map((clue) => ({
    id: clue.id,
    title: clue.title,
    importance: clue.importance,
    isDiscovered: record.playerProgress.discoveredClues.includes(clue.id),
    ...(record.playerProgress.discoveredClues.includes(clue.id) ? { description: clue.description } : {}),
  })),
  evidence: record.evidence,
  progress: {
    discoveredClues: record.playerProgress.discoveredClues,
    hintsUsed: record.playerProgress.hintsUsed,
    hintsRemaining: Math.max(0, DIFFICULTIES[record.difficulty].hints - record.playerProgress.hintsUsed),
    currentStage: record.playerProgress.currentStage,
    score: record.score,
  },
  status: record.status,
});

function findCase(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid case ID" });
  return Case.findById(req.params.id).then((record) => {
    if (!record) return res.status(404).json({ success: false, message: "Case not found" });
    req.caseRecord = record;
    return next();
  }).catch(next);
}

router.post("/", async (req, res, next) => {
  try {
    const premise = typeof req.body?.premise === "string" ? req.body.premise.trim() : "";
    const difficulty = typeof req.body?.difficulty === "string" ? req.body.difficulty.toLowerCase() : "";
    if (!premise) return res.status(400).json({ success: false, message: "Please enter a mystery premise" });
    if (premise.length > 500) return res.status(400).json({ success: false, message: "Premise must be 500 characters or fewer" });
    if (!Object.hasOwn(DIFFICULTIES, difficulty)) return res.status(400).json({ success: false, message: "Difficulty must be easy, medium, or hard" });
    const generated = await generateMystery(premise, difficulty);
    const record = await Case.create({ ...generated, premise, difficulty });
    return res.status(201).json({ success: true, case: safeCase(record) });
  } catch (error) { return next(error); }
});

router.get("/:id", findCase, (req, res) => res.json({ success: true, case: safeCase(req.caseRecord) }));

router.post("/:id/clues/:clueId/discover", findCase, async (req, res, next) => {
  try {
    const record = req.caseRecord;
    if (record.status !== "active") return res.status(409).json({ success: false, message: "This case is already completed" });
    const clue = record.clues.find((item) => item.id === req.params.clueId);
    if (!clue) return res.status(404).json({ success: false, message: "Clue not found" });
    const updated = await Case.findOneAndUpdate(
      { _id: record._id, status: "active", "playerProgress.discoveredClues": { $ne: clue.id } },
      { $addToSet: { "playerProgress.discoveredClues": clue.id }, $inc: { score: 5 } },
      { new: true },
    );
    if (!updated) return res.status(409).json({ success: false, message: record.playerProgress.discoveredClues.includes(clue.id) ? "Clue already discovered" : "This case is already completed" });
    return res.json({ success: true, clue: { id: clue.id, title: clue.title, description: clue.description, importance: clue.importance }, progress: { ...updated.playerProgress.toObject(), score: updated.score } });
  } catch (error) { return next(error); }
});

router.post("/:id/hints", findCase, async (req, res, next) => {
  try {
    const record = req.caseRecord;
    if (record.status !== "active") return res.status(409).json({ success: false, message: "This case is already completed" });
    const limit = DIFFICULTIES[record.difficulty].hints;
    if (record.playerProgress.hintsUsed >= limit) return res.status(409).json({ success: false, message: "You've used all available hints" });
    const hint = record.hints[record.playerProgress.hintsUsed];
    if (!hint) return res.status(409).json({ success: false, message: "No more hints are available" });
    const hintNumber = record.playerProgress.hintsUsed;
    const updated = await Case.findOneAndUpdate(
      { _id: record._id, status: "active", "playerProgress.hintsUsed": hintNumber },
      { $inc: { "playerProgress.hintsUsed": 1, score: -10 } },
      { new: true },
    );
    if (!updated) return res.status(409).json({ success: false, message: "Case state changed. Please try again" });
    if (updated.score < 0) { updated.score = 0; await updated.save(); }
    return res.json({ success: true, hint: { id: hint.id, text: hint.text }, progress: { hintsUsed: updated.playerProgress.hintsUsed, hintsRemaining: Math.max(0, limit - updated.playerProgress.hintsUsed), score: updated.score } });
  } catch (error) { return next(error); }
});

router.post("/:id/accuse", findCase, async (req, res, next) => {
  try {
    const record = req.caseRecord;
    if (record.status === "completed") return res.status(409).json({ success: false, message: "This case has already been completed" });
    const suspectId = typeof req.body?.suspectId === "string" ? req.body.suspectId : "";
    if (!record.suspects.some((suspect) => suspect.id === suspectId)) return res.status(400).json({ success: false, message: "Select a valid suspect" });
    const fullRecord = await Case.findById(record._id).select("+culprit +solution +supportingEvidence");
    if (record.status === "completed") return res.status(409).json({ success: false, message: "This case has already been completed" });
    const correct = suspectId === fullRecord.culprit;
    const score = Math.max(0, (correct ? DIFFICULTIES[record.difficulty].baseScore : 0)
      + fullRecord.playerProgress.discoveredClues.length * 5 - fullRecord.playerProgress.hintsUsed * 10);
    const completed = await Case.findOneAndUpdate(
      { _id: record._id, status: "active", "playerProgress.discoveredClues": { $eq: fullRecord.playerProgress.discoveredClues }, "playerProgress.hintsUsed": fullRecord.playerProgress.hintsUsed },
      { $set: { status: "completed", "playerProgress.currentStage": "completed", accusation: { suspectId, submittedAt: new Date(), correct }, score } },
      { new: true },
    );
    if (!completed) return res.status(409).json({ success: false, message: "This case has already been completed" });
    const accused = completed.suspects.find((suspect) => suspect.id === suspectId);
    const culprit = completed.suspects.find((suspect) => suspect.id === fullRecord.culprit);
    const support = fullRecord.supportingEvidence.map((itemId) => {
      const clue = completed.clues.find((item) => item.id === itemId);
      const evidence = completed.evidence.find((item) => item.id === itemId);
      return clue ? { id: itemId, title: clue.title, detail: clue.description } : evidence ? { id: itemId, title: evidence.title, detail: evidence.content } : { id: itemId, title: "Case evidence", detail: "" };
    });
    return res.json({ success: true, result: {
      correct, accusation: { suspectId, name: accused.name }, culprit: { id: culprit.id, name: culprit.name },
      score, explanation: fullRecord.solution, supportingEvidence: support,
    } });
  } catch (error) { return next(error); }
});

router.get("/:id/result", findCase, async (req, res, next) => {
  try {
    const record = req.caseRecord;
    if (record.status !== "completed") return res.status(409).json({ success: false, message: "Submit an accusation to see the result" });
    const fullRecord = await Case.findById(record._id).select("+culprit +solution +supportingEvidence");
    const culprit = record.suspects.find((suspect) => suspect.id === fullRecord.culprit);
    const accused = record.suspects.find((suspect) => suspect.id === record.accusation.suspectId);
    return res.json({ success: true, result: {
      correct: record.accusation.correct, accusation: { suspectId: accused.id, name: accused.name },
      culprit: { id: culprit.id, name: culprit.name }, score: record.score,
      explanation: fullRecord.solution, supportingEvidence: fullRecord.supportingEvidence.map((itemId) => {
        const clue = record.clues.find((item) => item.id === itemId);
        const evidence = record.evidence.find((item) => item.id === itemId);
        return clue ? { id: itemId, title: clue.title, detail: clue.description } : evidence ? { id: itemId, title: evidence.title, detail: evidence.content } : { id: itemId, title: "Case evidence", detail: "" };
      }),
    } });
  } catch (error) { return next(error); }
});

module.exports = router;
