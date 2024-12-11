const { body } = require("express-validator");

const roomValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),
];

module.exports = {
  roomValidation,
};
