import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      minlength: [3, "User name must be at lest 3 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      min: [5, "Password must be at lest 5 characters"],
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
