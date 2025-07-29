import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      minlength: [3, "Product title must be at least 3 character"],
      maxlength: [100, "Product titlle must not dxcced 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [10, "Product description must be at least 10 characters"],
      maxlength: [500, "Product description must not excced 500 characters"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price cannot be nigative"],
    },

    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: ["electronics", "books", "clothing"],
        message: "Category must be either electronics, books, or clothing",
      },
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
