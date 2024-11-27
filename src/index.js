const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");
    res.send("Database is connected!");
  } catch (err) {
    res.status(500).send("Database connection failed");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
