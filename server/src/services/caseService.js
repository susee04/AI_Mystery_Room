const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const path = require("path");
const { DIFFICULTIES } = require("../config/gameRules");
const { createLocalMystery } = require("./localMysteries");

// The service may be loaded by scripts or test runners that do not start
// through server.js, or whose working directory is outside the backend.
const envResult = require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
if (!process.env.GEMINI_API_KEY?.trim() && envResult.parsed?.GEMINI_API_KEY?.trim()) {
  process.env.GEMINI_API_KEY = envResult.parsed.GEMINI_API_KEY;
}

const generatedMysterySchema = z.object({
  title: z.string().min(3).max(120),
  story: z.string().min(80).max(3000),
  suspects: z.array(z.object({
    id: z.string().min(1), name: z.string().min(1).max(80), age: z.number().int().min(18).max(120).optional(),
    description: z.string().min(10).max(500), relationship: z.string().min(2).max(160),
    motive: z.string().min(5).max(500), background: z.string().max(500).optional(),
  })).min(3).max(5),
  clues: z.array(z.object({
    id: z.string().min(1), title: z.string().min(2).max(100), description: z.string().min(10).max(700),
    importance: z.enum(["low", "medium", "high"]).default("medium"),
  })).min(5).max(9),
  hints: z.array(z.object({ id: z.string().min(1), text: z.string().min(10).max(300) })).min(2).max(3),
  evidence: z.array(z.object({
    id: z.string().min(1), type: z.enum(["text", "message", "cctv", "image", "witness", "document", "object"]),
    title: z.string().min(2).max(100), description: z.string().max(500).optional(),
    content: z.string().min(10).max(1200), timestamp: z.string().max(80).optional(), location: z.string().max(120).optional(),
  })).min(3).max(12),
  culprit: z.string().min(1),
  solution: z.string().min(60).max(2000),
  supportingEvidence: z.array(z.string().min(1)).min(1),
});

const IMPORTANCE_ALIASES = Object.freeze({
  trivial: "low", minor: "low",
  normal: "medium", moderate: "medium",
  important: "high", major: "high", critical: "high",
});
const EVIDENCE_TYPE_ALIASES = Object.freeze({
  photo: "image", photograph: "image",
  video: "cctv", security_camera: "cctv", "security-camera": "cctv",
  chat: "message", text_message: "message", sms: "message",
  person: "witness", file: "document", report: "document", physical_item: "object",
});

function normalizeEnum(value, aliases) {
  if (typeof value !== "string") return value;
  const normalized = value.trim().toLowerCase();
  return aliases[normalized] || normalized;
}

function normalizeGeneratedEnums(generated) {
  if (!generated || typeof generated !== "object") return generated;
  return {
    ...generated,
    clues: Array.isArray(generated.clues) ? generated.clues.map((clue) => ({
      ...clue,
      importance: normalizeEnum(clue?.importance, IMPORTANCE_ALIASES),
    })) : generated.clues,
    evidence: Array.isArray(generated.evidence) ? generated.evidence.map((item) => ({
      ...item,
      type: normalizeEnum(item?.type, EVIDENCE_TYPE_ALIASES),
    })) : generated.evidence,
  };
}

function isTemporaryUnavailable(error) {
  const status = error?.status ?? error?.statusCode ?? error?.response?.status;
  const normalizedStatus = Number(status);
  const description = `${error?.message || ""} ${error?.statusText || ""} ${error?.code || ""} ${error?.name || ""} ${error?.cause?.code || ""}`;
  return [408, 429, 500, 502, 503, 504].includes(normalizedStatus)
    || /\bUNAVAILABLE\b|high demand|rate.?limit|RESOURCE_EXHAUSTED|tim(?:e|ed)[ -]?out|ETIMEDOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|ENETUNREACH|UND_ERR_CONNECT_TIMEOUT|temporary provider (?:failure|error|unavailable)/i.test(description);
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function validateGeneratedMystery(value, rules) {
  const generated = generatedMysterySchema.parse(normalizeGeneratedEnums(value));
  if (generated.suspects.length !== rules.suspects || generated.clues.length !== rules.clues || generated.hints.length !== rules.hints) {
    throw new Error("Generated mystery does not match requested difficulty counts");
  }
  const itemIds = [...generated.suspects, ...generated.clues, ...generated.hints, ...generated.evidence].map((item) => item.id);
  if (new Set(itemIds).size !== itemIds.length) throw new Error("Generated mystery contains duplicate item IDs");
  if (!generated.suspects.some((suspect) => suspect.id === generated.culprit)) throw new Error("Generated culprit does not match a suspect");
  const allIds = new Set([...generated.clues.map((item) => item.id), ...generated.evidence.map((item) => item.id)]);
  if (generated.supportingEvidence.some((id) => !allIds.has(id))) throw new Error("Generated supporting evidence references an unknown item");
  return generated;
}

function extractJson(text) {
  if (!text) throw new Error("Gemini returned an empty response");
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  return JSON.parse(cleaned);
}

async function generateMystery(premise, difficulty) {
  if (!process.env.GEMINI_API_KEY) throw new Error("AI service is not configured");
  const rules = DIFFICULTIES[difficulty];
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, httpOptions: { timeout: 45000, retryOptions: { attempts: 1 } } });
  const primaryModel = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash-lite";
  const fallbackModel = process.env.GEMINI_FALLBACK_MODEL?.trim() || "gemini-3.6-flash";
  const models = [primaryModel, fallbackModel];
  let lastError;

  for (let attempt = 0; attempt < models.length; attempt += 1) {
    if (attempt > 0) await wait(300 * (2 ** (attempt - 1)));
    try {
      const model = models[attempt];
      const response = await ai.models.generateContent({
        model,
        contents: `Create a wholly fictional, fair-play detective mystery based on this premise: ${premise}\nDifficulty: ${difficulty}. Return JSON only. Exactly ${rules.suspects} suspects, ${rules.clues} clues and ${rules.hints} hints. Include 4-7 fictional evidence items. All suspects must have plausible motives. Have one clearly deducible culprit, and support the solution with clue/evidence IDs. Hints must not name or directly reveal the culprit. Do not accuse real people. IMPORTANT ENUM RULE: Every clues[].importance value must be exactly one lowercase value: "low", "medium", or "high". Every evidence[].type value must be exactly one lowercase value: "text", "message", "cctv", "image", "witness", "document", or "object". Do not return synonyms, uppercase values, or any other values. Fields: title, story, suspects[{id,name,age,description,relationship,motive,background}], clues[{id,title,description,importance}], hints[{id,text}], evidence[{id,type,title,description,content,timestamp,location}], culprit (suspect id), solution (full explanation), supportingEvidence (array of clue/evidence ids).`,
        config: { responseMimeType: "application/json", temperature: 0.8 },
      });
      return validateGeneratedMystery(extractJson(response.text), rules);
    } catch (error) {
      lastError = error;
      const temporaryFailure = isTemporaryUnavailable(error);
      if (!temporaryFailure) break;
      if (attempt === models.length - 1) {
        console.warn("Gemini unavailable; using local fallback mystery.");
        return validateGeneratedMystery(createLocalMystery(difficulty), rules);
      }
    }
  }
  console.error("Mystery generation failed validation or provider request:", lastError?.message);
  const error = new Error("We couldn't generate a mystery right now. Please try again.");
  error.status = 502;
  throw error;
}

module.exports = { generateMystery, validateGeneratedMystery };
