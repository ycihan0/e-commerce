const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const logger=require("morgan");
const mainRoute=require("./routes/index.js");
const port = 5000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(logger("dev"));
app.use(express.json());

app.use("/api", mainRoute);

app.get("/", (req, res) => {
  res.send("Hello Express.js");
});

app.get("/api", (req, res) => {
  res.send("This is API Route.");
});

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});