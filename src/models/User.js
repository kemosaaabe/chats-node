const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

module.exports = User;
