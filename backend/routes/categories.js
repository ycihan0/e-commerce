const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");

//create a new category
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body; //kullanıcının girdiği veri buradan alınır
    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory); //başarılı olursa cevap dön 201 yeni oluşma başarılı kodu
  } catch (error) {
    console.log(error);
  }
});

//bring all categories(Read-All)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find(); //mongoose methodu find ile içindeki verileri alma
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

//bring one category (Read-Sigle)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId; //req.params={{url}}/categories/
    try {
      const category = await Category.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Category not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//category update
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    //Eğer Idyi bulamazsan hata dön;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true } //güncellenmiş değeri gönder
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error: Server error." });
  }
});

module.exports = router;
