const express = require("express");
require("dotenv").config();

const { syncDB } = require("./database");
require("./models");

const authRoutes = require("./routes/auth");
const roomsRoutes = require("./routes/rooms");
const messagesRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");
const createTestData = require("./initDb");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(authRoutes);
app.use(roomsRoutes);
app.use(messagesRoutes);
app.use(userRoutes);

(async () => {
  try {
    await syncDB();
    await createTestData();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to initialize the app:", err);
    process.exit(1);
  }
})();
