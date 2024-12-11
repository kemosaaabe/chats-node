const express = require("express");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const {
  registerValidation,
  loginValidation,
} = require("../validations/userValidation");
const { handleValidationErrors } = require("../validations/libs");

const router = express.Router();

router.post("/api/register", registerValidation, async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;

  try {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email are not unique" });
    }

    await User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ status: "success register" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/api/login", loginValidation, async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
