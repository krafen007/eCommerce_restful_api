import { logInHandler, registerHandler } from "./../services/userService.js";

/***
 * @desc Register new user
 * @route POST /apu/users/register
 * @access Public
 */
export const register = async (req, res) => {
  try {
    const user = await registerHandler(req.body);
    return res.status(201).json({
      message: "User account created successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Internal server error while registration",
      error: error.message,
    });
  }
};

/**
 * @desc Log in existing user
 * @route POST /api/users/login
 * @access Public
 */
export const logIn = async (req, res) => {
  try {
    const user = await logInHandler(req.body);
    return res.status(200).json({
      message: "Logged in successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Internal server error while login process",
      error: error.message,
    });
  }
};
