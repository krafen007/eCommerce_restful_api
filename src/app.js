import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import productRoute from "./routes/productRoute.js"

const app = express();

// Midlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("api/products", productRoute)

export default app;
