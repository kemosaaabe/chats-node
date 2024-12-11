const { body } = require("express-validator");

const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Email must be between 3 and 50 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 50 })
    .withMessage("Password must be between 6 and 50 characters"),
];

const loginValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 50 })
    .withMessage("Password must be between 6 and 50 characters"),
];

module.exports = {
  registerValidation,
  loginValidation,
};
