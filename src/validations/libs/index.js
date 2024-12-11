const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array({ onlyFirstError: true })
      .map((error) => ({
        [error.path]: error.msg,
      }));

    return res.status(400).json({ errors: formattedErrors });
  }
  return null;
};

module.exports = { handleValidationErrors };
