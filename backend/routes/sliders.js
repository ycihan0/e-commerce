const express = require("express");
const router = express.Router();
const Slider = require("../models/Slider.js");

//create a new slider
router.post("/", async (req, res) => {
    try {
      const newSlider = new Slider(req.body);
      await newSlider.save();
  
      res.status(201).json(newSlider);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

//bring all sliders (Read-All)
router.get("/", async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

// //bring one Slider (Read-Sigle by slider ID)
// router.get("/:sliderId", async (req, res) => {
//   try {
//     const sliderId = req.params.sliderId;
//     const slider = await Slider.findById(sliderId);
//     if (!slider) {
//       return res.status(404).json({ error: "Slider not found." });
//     }
//     res.status(200).json(slider);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Server error." });
//   }
// });

// //bring one Slider (Read-Sigle by slider code)
// router.get("/code/:sliderCode", async (req, res) => {
//   try {
//     const sliderCode = req.params.sliderCode;
//     const slider = await Slider.findOne({ code: sliderCode });
//     if (!slider) {
//       return res.status(404).json({ error: "Slider not found." });
//     }
//     const { discountPercent } = slider;
//     res.status(200).json({ discountPercent });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Server error." });
//   }
// });

//slider update
router.put("/:sliderId", async (req, res) => {
  try {
    const sliderId = req.params.sliderId;
    const updates = req.body;
    const existingSlider = await Slider.findById(sliderId);
    if (!existingSlider) {
      return res.status(404).json({ error: "Slider not found." });
    }
    //If you can't find Id, return error;

    const updatedSlider = await Slider.findByIdAndUpdate(
      sliderId,
      updates,
      { new: true } //send updated value
    );
    res.status(200).json(updatedSlider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error: Server error." });
  }
});

//slider delete
router.delete("/:sliderId", async (req, res) => {
  try {
    const sliderId = req.params.sliderId;

    const deletedSlider = await Slider.findByIdAndDelete(sliderId);

    if (!deletedSlider) {
      return res.status(404).json({ error: "Slider not found." });
    }

    res.status(200).json(deletedSlider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
