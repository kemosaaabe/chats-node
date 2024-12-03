const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Room = sequelize.define(
  "Room",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "rooms",
  }
);

Room.sync({ alter: true });

module.exports = Room;
