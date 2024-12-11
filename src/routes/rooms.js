const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const roomController = require("../controllers/roomController");
const { roomValidation } = require("../validations/roomValidation");

const roomsUrl = "/api/rooms";

router.get(roomsUrl, verifyToken, roomController.getAllRooms);
router.get(`${roomsUrl}/:id`, verifyToken, roomController.getCurrentRoom);
router.delete(`${roomsUrl}/:id`, verifyToken, roomController.deleteRoom);
router.post(roomsUrl, verifyToken, roomValidation, roomController.createRoom);
router.put(
  `${roomsUrl}/:id`,
  verifyToken,
  roomValidation,
  roomController.updateRoom
);

module.exports = router;
