import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

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
Analyze the candidate's resume, self description and job description.
Generate a detailed interview report.

Candidate:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
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
              required: ["question", "intention", "answer"],
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
              required: ["question", "intention", "answer"],
            },
          },
          skillGaps: {
            type: "array",
            items: {
              type: "object",
              properties: {
                skill: { type: "string" },
                severity: { type: "string", enum: ["low", "medium", "high"] },
              },
              required: ["skill", "severity"],
            },
          },
          preparationPlan: {
            type: "array",
            items: {
              type: "object",
              properties: {
                day: { type: "number" },
                focus: { type: "string" },
                tasks: { type: "array", items: { type: "string" } },
              },
              required: ["day", "focus", "tasks"],
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
      responseSchema: responseSchemaOfAi ,
    },
  });

  return JSON.parse(response.text);
}

export default generateInterviewReport;
