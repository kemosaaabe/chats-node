const { Message, User } = require("../models");

const getRoomMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.findAll({
      where: { room_id: roomId },
      order: [["createdAt", "ASC"]],
      include: { model: User, attributes: ["username"], as: "user" },
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const createMessage = async (req, res) => {
  const { roomId } = req.params;
  const { content } = req.body;
  const userId = req.userId;

  try {
    const message = await Message.create({
      content,
      user_id: userId,
      room_id: roomId,
    });

    const roomMessages = await Message.findAll({
      where: { room_id: message.room_id },
      order: [["createdAt", "ASC"]],
      include: { model: User, attributes: ["username"], as: "user" },
    });

    res.status(201).json({ messages: roomMessages });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateMessage = async (req, res) => {
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

    const roomMessages = await Message.findAll({
      where: { room_id: message.room_id },
      order: [["createdAt", "ASC"]],
      include: { model: User, attributes: ["username"], as: "user" },
    });

    res.status(200).json({ messages: roomMessages });
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

    const roomMessages = await Message.findAll({
      where: { room_id: message.room_id },
      order: [["createdAt", "ASC"]],
      include: { model: User, attributes: ["username"], as: "user" },
    });

    res.status(200).json({ messages: roomMessages });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getRoomMessages,
  createMessage,
  updateMessage,
  deleteMessage,
};
