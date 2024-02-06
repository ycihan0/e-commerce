const express = require("express");
const router = express.Router();

//bring all products
router.get("/", async (req, res) => {
  res.send("products were brought");
});

module.exports = router;