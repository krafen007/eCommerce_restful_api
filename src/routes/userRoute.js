import express from "express";
import { logIn, register } from "./../controllers/userController.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.get("/profile", validateJWT, (req, res) => {
  const user = req.user;

  res.status(200).json({
    message: "Welcome to your profile",
    data: user,
  });
});

export default router;
