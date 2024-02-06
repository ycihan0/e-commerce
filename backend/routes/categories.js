const express = require("express");
const router = express.Router();

//bring all categories
router.get("/", async (req, res) => {
  res.send("categories were brought");
});

module.exports = router;