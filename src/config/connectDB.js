import mongoose from "mongoose";

export default function connectDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected!"))
    .catch((err) => console.error(`Database Error Catch: ${err.message}`));
}

