import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import blacklistModel from "../models/blacklist.model.js";
/**
 * @route POST  /api/auth/register
 * @description Register a new user
 * @access Public
 */
async function registerUserController(req, res) {
  console.log("REGISTER CONTROLLER HIT");
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email and password is required",
    });
  }

  const isUserExisiting = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExisiting && isUserExisiting.username === username) {
    return res.status(400).json({
      message: "Username already taken",
    });
  }
  if (isUserExisiting && isUserExisiting.email === email) {
    return res.status(400).json({
      message: "Email already taken",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  console.log(`hashed password - ${hash}`);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @route POST  /api/auth/login
 * @description Login existing user
 * @access Public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password is required",
    });
  }

  const isUserExisiting = await userModel.findOne({
    email,
  });

  if (!isUserExisiting) {
    return res.status(400).json({
      message: "Email does not exist, please register first",
    });
  }
  console.log(password);
  console.log(isUserExisiting.password);

  const compare = await bcrypt.compare(password, isUserExisiting.password);
  if (!compare) {
    return res.status(400).json({
      message: "Email or password is incorrect",
    });
  }
  const token = jwt.sign(
    { id: isUserExisiting._id, username: isUserExisiting.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggedIn successfully",
    user: {
      id: isUserExisiting._id,
      username: isUserExisiting.username,
      email: isUserExisiting.email,
    },
  });
}

/**
 * @route GERT  /api/auth/Logout
 * @description Logout loggedin user and clear the cookie and add it in the blacklist
 * @access Public
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;
  console.log(`Token is - ${token}`);
  if (token) {
    await blacklistModel.create({ token });
  }

  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

/**
 * @route GERT  /api/auth/get-me
 * @description Get the details of the user from the database after checking the token
 * @access Public
 */

async function getMeUser(req, res) {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    res.status(302).json({
      message: "Please login first",
    });
  }
  res.status(200).json({
    message: "User details fetched ",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function printok(req, res) {
   console.log("OK PRINTED")
    res.status(302).json({
      message: "OK PRINTED",
    });
}
export default {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeUser,
  printok
};
