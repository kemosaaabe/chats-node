const User = require("./User");
const Room = require("./Room");
const Message = require("./Message");
const RoomMember = require("./RoomMember");

User.hasMany(Message, { foreignKey: "user_id", as: "messages" });
Message.belongsTo(User, { foreignKey: "user_id", as: "user" });

Room.hasMany(Message, { foreignKey: "room_id", as: "messages" });
Message.belongsTo(Room, { foreignKey: "room_id", as: "room" });

User.belongsToMany(Room, { through: RoomMember, foreignKey: "user_id" });
Room.belongsToMany(User, { through: RoomMember, foreignKey: "room_id" });

module.exports = { User, Room, Message, RoomMember };
