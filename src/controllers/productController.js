import productModel from "../models/productModel.js";

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export async function getAllProduct(req, res) {
  try {
    const products = await productModel.find();
    return res.status(200).json({
      message: "`Fetched ${products.length} products successfully`,",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while get all products",
      error: error.message,
    });
  }
}

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Admin
 */
export async function createProduct(req, res) {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await productModel.create({
      title,
      description,
      price,
      category,
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while creating new product",
      error: error.message,
    });
  }
}

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const updatedProduct = await productModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(201).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal sever error while update product",
      error: error.message,
    });
  }
}

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while deleting product",
      error: error.message,
    });
  }
}
