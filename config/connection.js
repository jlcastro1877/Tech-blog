const Sequelize = require("sequelize");
require("dotenv").config(); //Import sensitive data from .env

const sequelize = new Sequelize(
  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
  process.env.DB_URL,

  {
    host: "localhost",
    dialect: "postgres",
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

module.exports = sequelize;
