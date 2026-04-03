import generateInterviewReport from "../services/ai.services.js"
import reportModel from "../models/report.model.js"
import { PDFParse } from "pdf-parse"

async function generateInterViewReportController(req, res) {
    const parser = new PDFParse({ data: req.file.buffer })
    const result = await parser.getText()
    await parser.destroy()
    const resumeContent = result.text
    const { selfDescription, jobDescription } = req.body

    //calling function from ai.services.js
    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await reportModel.create({
        users: req.user.id, //type - mongoose.Schema.Types.ObjectId in the schema
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

async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await reportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

async function getAllInterviewReportsController(req, res) {
    //select only title from the reports to display
    const interviewReports = await reportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}



export {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
};

// Optional default for backward compatibility
export default {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
};