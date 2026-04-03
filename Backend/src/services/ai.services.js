import dotenv from "dotenv";
dotenv.config();

//gemini sdk
import { GoogleGenAI } from "@google/genai";

//initializing gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
} = {}) {
  if (!resume) throw new Error("Missing resume field");
  if (!jobDescription) throw new Error("Missing jobDescription field");

  const prompt = `
You are an expert interview preparation assistant.

STRICT INSTRUCTIONS (MANDATORY):
- ONLY analyze the provided Resume, Self Description, and Job Description.
- DO NOT include any unrelated information (e.g., personal opinions, stories, jokes, or topics like food, daily life, etc.).
- DO NOT go off-topic under any circumstances.
- DO NOT assume information that is not present in the inputs.
- If data is missing, make reasonable professional assumptions but stay within context.
- Your output MUST strictly follow the JSON schema provided.
- DO NOT add extra fields.
- DO NOT add explanations outside JSON.
- DO NOT return plain text — ONLY valid JSON.

SCORING RULE:
- Be brutally honest and strict while assigning matchScore.
- Do NOT inflate scores.

TASK:
Analyze the candidate profile and generate:
- matchScore
- title
- technicalQuestions (with intention + answer)
- behavioralQuestions (with intention + answer)
- skillGaps (with severity)
- preparationPlan (day-wise actionable tasks)

INPUT DATA:
Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const responseSchemaOfAi = {
    type: "object",
    properties: {
      matchScore: { type: "number" },
      title: { type: "string" },

      technicalQuestions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            intention: { type: "string" },
            answer: { type: "string" },
          },
        },
      },

      behavioralQuestions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            intention: { type: "string" },
            answer: { type: "string" },
          },
        },
      },

      skillGaps: {
        type: "array",
        items: {
          type: "object",
          properties: {
            skill: { type: "string" },
            severity: {
              type: "string",
              enum: ["low", "medium", "high"],
            },
          },
        },
      },

      preparationPlan: {
        type: "array",
        items: {
          type: "object",
          properties: {
            day: { type: "number" },
            focus: { type: "string" },
            tasks: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },

    required: [
      "matchScore",
      "title",
      "technicalQuestions",
      "behavioralQuestions",
      "skillGaps",
      "preparationPlan",
    ],
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.7,
      responseSchema: responseSchemaOfAi,
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (err) {
    throw new Error("Invalid AI response format");
  }
}

export default generateInterviewReport;
