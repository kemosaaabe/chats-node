const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const roomController = require("../controllers/roomController");

const roomsUrl = "/api/rooms";

router.get(roomsUrl, verifyToken, roomController.getAllRooms);
router.get(`${roomsUrl}/:id`, verifyToken, roomController.getCurrentRoom);
router.post(roomsUrl, verifyToken, roomController.createRoom);
router.delete(`${roomsUrl}/:id`, verifyToken, roomController.deleteRoom);
router.put(`${roomsUrl}/:id`, verifyToken, roomController.updateRoom);

module.exports = router;
