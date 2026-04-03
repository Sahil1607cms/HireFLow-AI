import express from "express"
import authUser from "../middlewares/auth.middleware.js" 
import {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
} from "../controller/interview.controller.js";
import upload from "../middlewares/file.middleware.js"

const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description generate interview report.
 * @access private
 */
interviewRouter.post("/",authUser,upload.single("resume") ,generateInterViewReportController )

/**
 * @route GET /api/interview/report/:reportId
 * @description get interview report by reportId.
 * @access private
 */
interviewRouter.get("/report/:reportId", authUser, getInterviewReportByIdController)

/**
 * @route GET /api/report/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authUser, getAllInterviewReportsController)


export default interviewRouter