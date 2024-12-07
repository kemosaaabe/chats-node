const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/api/rooms", verifyToken, (_req, res) => {
  res.status(200).json("Rooms get success");
});

module.exports = router;
