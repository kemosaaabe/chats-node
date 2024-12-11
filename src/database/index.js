const { Sequelize } = require("sequelize");
const dbConfig = require("../config/dbConfig");

const sequelize = new Sequelize({
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  port: 5432,
  retry: {
    max: 5,
    delay: 5000,
  },
});

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Error syncing models:", err);
  }
};

module.exports = { sequelize, syncDB };
