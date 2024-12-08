const { Sequelize } = require("sequelize");
const dbConfig = require("../config/dbConfig");
// const createTestData = require("../initDb");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    // await createTestData();
  } catch (err) {
    console.error("Error syncing models:", err);
  }
};

module.exports = { sequelize, connectDB, syncDB };
