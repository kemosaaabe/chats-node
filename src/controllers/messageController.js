const { Message } = require("../models");
const { handleValidationErrors } = require("../validations/libs");

const createMessage = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;

  const { roomId } = req.params;
  const { content } = req.body;
  const userId = req.userId;

  try {
    await Message.create({
      content,
      user_id: userId,
      room_id: roomId,
    });

    res.status(201).json({ status: "success create" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateMessage = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;

  const { messageId } = req.params;
  const { content } = req.body;
  const userId = req.userId;

  try {
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "You don't have permission to edit this message" });
    }

    await message.update({ content, updatedAt: new Date() });

    res.status(200).json({ status: "success update" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  const userId = req.userId;

  try {
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "You don't have permission to delete this message" });
    }

    await message.destroy();

    res.status(200).json({ status: "success delete" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createMessage,
  updateMessage,
  deleteMessage,
};
