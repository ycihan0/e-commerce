const mongoose = require("mongoose");

const InfoSchema = mongoose.Schema(
  {
    googleSrc: { type: String, required: true },
    adress: { type: String, required: true },
    logo: { type: String, required: true }
  },
  { timestamps: true }
);

const Info = mongoose.model("Info", InfoSchema);
module.exports = Info;
