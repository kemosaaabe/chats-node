const { Room, Message, User } = require("../models");
const { handleValidationErrors } = require("../validations/libs");

const getAllRooms = async (_req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getCurrentRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findByPk(id, {
      include: [
        {
          model: Message,
          as: "messages",
          order: [["createdAt", "ASC"]],
          include: {
            model: User,
            attributes: ["username"],
            as: "user",
          },
        },
      ],
    });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json({ data: room });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createRoom = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;

  try {
    const { name } = req.body;
    await Room.create({ name });

    res.status(201).json({ status: "success create" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    await room.destroy();
    res.status(200).json({ status: "success delete" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateRoom = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;

  try {
    const { id } = req.params;
    const { name } = req.body;

    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    await room.update({ name });

    res.status(200).json({ status: "success update" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllRooms,
  getCurrentRoom,
  createRoom,
  deleteRoom,
  updateRoom,
};
