const { User, Room } = require("./models");
const bcrypt = require("bcrypt");

async function createTestData() {
  const userPassword = await bcrypt.hash("test1234", 10);

  const user = await User.create({
    username: "test_user",
    password: userPassword,
    email: "test_user@example.com",
  });

  const room1 = await Room.create({ name: "Room 1" });
  const room2 = await Room.create({ name: "Room 2" });

  await Promise.all([
    Message.create({
      content: "Hello in Room 1!",
      user_id: user.id,
      room_id: room1.id,
    }),
    Message.create({
      content: "Another message in Room 1.",
      user_id: user.id,
      room_id: room1.id,
    }),
    Message.create({
      content: "Hello in Room 2!",
      user_id: user.id,
      room_id: room2.id,
    }),
  ]);
}

module.exports = createTestData;
