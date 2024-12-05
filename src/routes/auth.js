const express = require("express");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { User } = require("../models");

const router = express.Router();

// Registration
router.post("/api/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      passwordHash: hashedPassword,
      email,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
