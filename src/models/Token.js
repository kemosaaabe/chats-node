const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const User = require("./User");

const Token = sequelize.define(
  "Token",
  {
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    type: {
      type: DataTypes.ENUM("access", "refresh"),
      allowNull: false,
      unique: "unique_token_per_user",
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isRevoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "tokens",
  }
);

Token.belongsTo(User, { foreignKey: "userId" });
Token.sync({ alter: true });

module.exports = Token;
