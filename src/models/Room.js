const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Room = sequelize.define(
  "Room",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
  },
  {
    timestamps: false,
    tableName: "rooms",
  }
);

module.exports = Room;
