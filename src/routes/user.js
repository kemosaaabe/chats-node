const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get(`/api/user/:id`, verifyToken, userController.getUser);

module.exports = router;
