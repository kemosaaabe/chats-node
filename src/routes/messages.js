const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const messageController = require("../controllers/messageController");

const messagesUrl = "/api/messages";

router.post(
  `${messagesUrl}/:roomId`,
  verifyToken,
  messageController.createMessage
);

router.put(
  `${messagesUrl}/:messageId`,
  verifyToken,
  messageController.updateMessage
);

router.delete(
  `${messagesUrl}/:messageId`,
  verifyToken,
  messageController.deleteMessage
);

module.exports = router;
