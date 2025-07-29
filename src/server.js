import app from "./app.js";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);


