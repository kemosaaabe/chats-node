const express = require("express");
const { connectDB, syncDB } = require("./database");
require("dotenv").config();
require("./models");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    res.send("Server is healthy!");
  } catch (err) {
    res.status(500).send("Server health check failed");
  }
});

(async () => {
  try {
    await connectDB();
    await syncDB();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to initialize the app:", err);
    process.exit(1);
  }
})();
