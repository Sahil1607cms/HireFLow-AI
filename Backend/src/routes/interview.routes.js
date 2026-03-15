import express from "express"
import authController from "../controller/auth.controller.js"
import authUser from "../middlewares/auth.middleware.js" 
import interviewController from "../controller/interview.controller.js"
import upload from "../middlewares/file.middleware.js"

const interviewRouter = express.Router()

interviewRouter.post("/interview",authUser,upload.single("resume") ,interviewController.generateInterViewReportController )


export default interviewRouter