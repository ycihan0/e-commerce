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
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({error:"Server error."})
  }
});

module.exports = router;
