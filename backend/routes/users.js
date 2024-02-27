const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

//bring all users (Read-All)
router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

  //user delete
router.delete("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const deletedUser = await User.findOneAndDelete({email});

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
  
//Update Password
router.put("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const { oldPassword, newPassword } = req.body;

    // Kullanıcıyı e-posta adresine göre bul
    const user = await User.findOne({ email });

    // Kullanıcı bulunamazsa hata döndür
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Eski şifre doğru mu kontrol et
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    // Eğer eski şifre doğru değilse hata döndür
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid old password." });
    }

    // Yeni şifreyi hash'le
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Kullanıcının şifresini güncelle
    user.password = hashedNewPassword;

    // Güncellenmiş kullanıcıyı kaydet
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
  module.exports = router;