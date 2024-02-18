const mongoose = require("mongoose");

const SliderSchema = mongoose.Schema(
  {
    img: { type: String, required: true }
  },
  { timestamps: true }
);

const Slider = mongoose.model("Slider", SliderSchema);
module.exports = Slider;
