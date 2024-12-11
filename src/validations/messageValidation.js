const { body } = require("express-validator");

const messageValidation = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ max: 255 })
    .withMessage("Max length: 255 characters"),
];

module.exports = {
  messageValidation,
};
