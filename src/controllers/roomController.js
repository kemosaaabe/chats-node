const { Room } = require("../models");

const getAllRooms = async (req, res) => {
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

    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const room = await Room.create({ name });

    res.status(201).json(room);
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
    res.status(200).json({ message: "Success deleting" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    await room.update({ name });

    res.status(200).json({ message: "Success update", room });
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
