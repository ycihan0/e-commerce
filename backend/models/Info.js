const mongoose = require("mongoose");

const InfoSchema = mongoose.Schema(
  {
    logo: { type: String, required: true }
  },
  { timestamps: true }
);

const Info = mongoose.model("Info", InfoSchema);
module.exports = Info;
