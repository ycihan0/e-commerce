const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

//create a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//bring all products (Read-All)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//bring one Product (Read-Sigle)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//product update
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error: Server error." });
  }
});

//product delete
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//Search products by name
router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const products = await Product.find({
      name:{$regex:productName, $options:"i"}//regex belirli bir isme göre ara options ise büyük küçük harf zorunluluğu olmadan ara
    })
    res.status(200).json(products)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
