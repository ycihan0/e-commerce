const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

//create user(create-register)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const defaultAvatar = generateRandomAvatar();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email adress is aldready register" });
    }

    const hashedPassport = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username,
      email,
      password: hashedPassport,
      avatar: defaultAvatar,
    });

    await newUser.save();

    res.status(201).json(newUser);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //compare passwords
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password." });
      }

    res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    });
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
