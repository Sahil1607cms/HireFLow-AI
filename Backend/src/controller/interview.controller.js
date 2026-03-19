import generateInterviewReport from "../services/ai.services.js"
import reportModel from "../models/report.model.js"
import { PDFParse } from "pdf-parse"

async function generateInterViewReportController(req, res) {
    const parser = new PDFParse({ data: req.file.buffer })
    const result = await parser.getText()
    await parser.destroy()
    const resumeContent = result.text
    const { selfDescription, jobDescription } = req.body
    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await reportModel.create({
        user: req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully.",
        interviewReport
    })

}

export default {generateInterViewReportController}