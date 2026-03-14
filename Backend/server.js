import dotenv from "dotenv";
import connectDb from "./src/config/database.js"
import app from "./src/app.js"
dotenv.config();

await connectDb()


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})