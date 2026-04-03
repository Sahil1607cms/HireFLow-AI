
import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import cors from "cors"

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
app.use(express.json()) //parses json body, allows req.body, else undefined
app.use(cookieParser()) 
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)


export default app;