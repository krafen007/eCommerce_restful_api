import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "User full name is required"],
      minlength: [3, "User full name must be at least 3 characters"],
      maxlength: [100, "User full name must not excced 100 characters"],
    },

    age: {
      type: Number,
      required: [true, "User age is required"],
      minlength: [16, "User age must be at least 16 years old"],
    },

    email: {
      type: String,
      required: [true, "User email is required"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: [5, "Password must be at least 5 characters long"],
      maxlength: [20, "Password must not exceed 20 characters"],
      select: false,
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
