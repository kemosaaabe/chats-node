const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const messageController = require("../controllers/messageController");
const { messageValidation } = require("../validations/messageValidation");

const messagesUrl = "/api/messages";

router.post(
  `${messagesUrl}/:roomId`,
  verifyToken,
  messageValidation,
  messageController.createMessage
);

router.put(
  `${messagesUrl}/:messageId`,
  verifyToken,
  messageValidation,
  messageController.updateMessage
);

router.delete(
  `${messagesUrl}/:messageId`,
  verifyToken,
  messageController.deleteMessage
);

module.exports = router;
