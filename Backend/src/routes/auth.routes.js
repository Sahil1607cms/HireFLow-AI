import express from "express"
import authController from "../controller/auth.controller.js"
import authUser from "../middlewares/auth.middleware.js"
const authRouter = express.Router()

/**
 * @route POST  /api/auth/register
 * @description Register a new user 
 * @access Public
 */
authRouter.post("/register",authController.registerUserController)

/**
 * @route POST  /api/auth/login
 * @description Login existing user with email and password
 * @access Public
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @route GET  /api/auth/logout
 * @description Logout loggedin user and clear the cookie and add it in the blacklist
 * @access Public
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 * @route GET  /api/auth/get-me
 * @description Get the details of the user from the database after checking the token
 * @access Public
 */
authRouter.get("/get-me",authUser ,authController.getMeUser)

export default authRouter