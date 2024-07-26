require("dotenv").config();
const Sequelize = require("sequelize");

const databaseUrl = process.env.DB_URL;

console.log("DB_URL:", databaseUrl); // Adicione esta linha para depuração

if (!databaseUrl) {
  throw new Error("A variável de ambiente DB_URL não está definida.");
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions: {
    decimalNumbers: true,
  },
  logging: false,
});

module.exports = sequelize;
