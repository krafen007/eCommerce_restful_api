import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

/***
 * @desc Register new user
 * @route POST /apu/users/register
 * @access Public
 */
export async function register(req, res) {
  try {
    const { fullName, age, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullName,
      age,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "User account created successfully.",
      token,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while creating the user.",
      error: error.message,
    });
  }
}

/**
 *
 * @desc Log in existing user
 * @route POST /api/users/login
 * @access Public
 */
export async function logIn(req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(404).json({
        message: "No user found with this email.",
      });
    }
    console.log(password, existingUser.password);

    const matchingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchingPassword) {
      return res.status(400).json({
        message: "Incorrect password. Please try again.",
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      message: "Logged in successfully.",
      token,
      data: existingUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error during login process.",
      error: error.message,
    });
  }
}
