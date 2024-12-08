const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Room = require("./Room");
const User = require("./User");

const Message = sequelize.define(
  "Message",
  {
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Room,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "messages" }
);

module.exports = Message;
