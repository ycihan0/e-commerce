const express = require("express");
const router = express.Router();
const Info = require("../models/Info.js");

//create a new info
router.post("/", async (req, res) => {
  try {
    const newInfo = new Info(req.body);
    await newInfo.save();

    res.status(201).json(newInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//bring all infos (Read-All)
router.get("/", async (req, res) => {
  try {
    const infos = await Info.find();
    res.status(200).json(infos);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

//bring one Info (Read-Sigle by info ID)
router.get("/:infoId", async (req, res) => {
  try {
    const infoId = req.params.infoId;
    const info = await Info.findById(infoId);
    if (!info) {
      return res.status(404).json({ error: "Info not found." });
    }
    res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//bring one Info (Read-Sigle by info code)
router.get("/code/:infoCode", async (req, res) => {
  try {
    const infoCode = req.params.infoCode;
    const info = await Info.findOne({ code: infoCode });
    if (!info) {
      return res.status(404).json({ error: "Info not found." });
    }
    const { discountPercent } = info;
    res.status(200).json({ discountPercent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//info update
router.put("/:infoId", async (req, res) => {
  try {
    const infoId = req.params.infoId;
    const updates = req.body;
    const existingInfo = await Info.findById(infoId);
    if (!existingInfo) {
      return res.status(404).json({ error: "Info not found." });
    }
    //If you can't find Id, return error;

    const updatedInfo = await Info.findByIdAndUpdate(
      infoId,
      updates,
      { new: true } //send updated value
    );
    res.status(200).json(updatedInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error: Server error." });
  }
});

//info delete
router.delete("/:infoId", async (req, res) => {
  try {
    const infoId = req.params.infoId;

    const deletedInfo = await Info.findByIdAndDelete(infoId);

    if (!deletedInfo) {
      return res.status(404).json({ error: "Info not found." });
    }

    res.status(200).json(deletedInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;

