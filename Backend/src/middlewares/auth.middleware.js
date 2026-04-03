import jwt from "jsonwebtoken";
import blacklistModel from "../models/blacklist.model.js";

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //creating a new property in the request named as user and setting decoded value as the user value
    const istokenblacklisted = await blacklistModel.findOne({ token });
    if (istokenblacklisted) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    console.log("Error while verifying the jwt token");
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
export default authUser;
