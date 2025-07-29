import express from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import adminOnly from "../middlewares/adminOnly.js";

const router = express.Router();

router.get("/", validateJWT, adminOnly, (req, res) => {
  const admin = req.user;
  res.status(200).json({
    message: "Welcome admin",
    data: admin,
  });
});

export default router;

