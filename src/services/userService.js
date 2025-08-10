import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "./../models/User.js";

// Register Handler
export const registerHandler = async ({ userName, email, password }) => {
  const findUser = await UserModel.findOne({ email });

  if (findUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    userName,
    email,
    password: hashedPassword,
  });

  const user = newUser.toObject();

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

  user.token = token;

  delete user.password;

  return user;
};

// Log In Handler
export const logInHandler = async ({ email, password }) => {
  const findUser = await UserModel.findOne({ email });

  if (!findUser) {
    const error = new Error("Not user found with this email");
    error.statusCode = 404;
    throw error;
  }

  const passwordMath = await bcrypt.compare(password, findUser.password);

  if (!passwordMath) {
    const error = new Error("Incorrect password, please try again");
    error.statusCode = 401;
    throw error;
  }

  const user = newUser.toObject();

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

  user.token = token;

  delete user.password;

  return user;
};
