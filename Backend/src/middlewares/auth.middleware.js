import jwt from "jsonwebtoken";
import blacklistModel from "../models/blacklist.model.js";

async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: "Token not found",
    });
  }
  const istokenblacklisted = await blacklistModel.findOne({token})
  if(istokenblacklisted){
    res.status(401).json({
      message: "Invalid token",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //creating a new property in the request named as user and setting decoded value as the user value
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Error while verifying the jwt token");
    res.status(401).json({
      message: "Invalid token",
    });
  }
}
export default authUser;
