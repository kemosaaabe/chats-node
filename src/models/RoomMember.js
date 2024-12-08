const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const Room = require("./Room");
const User = require("./User");

const RoomMember = sequelize.define(
  "RoomMember",
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
    joined_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "room_members",
    indexes: [{ unique: true, fields: ["room_id", "user_id"] }],
  }
);

module.exports = RoomMember;
