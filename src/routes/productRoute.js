import express from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import adminOnly from "../middlewares/adminOnly.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/productController.js";


const router = express.Router();

router.get("/", getAllProduct);
router.post("/", validateJWT, adminOnly, createProduct);
router.put("/:id", validateJWT, adminOnly, updateProduct);
router.delete("/:id", validateJWT, adminOnly, deleteProduct);

export default router;

