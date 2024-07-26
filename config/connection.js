require("dotenv").config(); // Carrega variáveis de ambiente
const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DB_URL;

if (!databaseUrl) {
  throw new Error("A variável de ambiente DB_URL não está definida.");
}

console.log("DB_URL:", databaseUrl); // Para depuração

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions: {
    decimalNumbers: true,
    ssl: {
      require: true,
      rejectUnauthorized: false, // Ajuste conforme necessário
    },
  },
  pool: {
    max: 10, // Ajuste conforme necessário
    min: 0,
    acquire: 30000, // Tempo máximo de aquisição de conexão em ms
    idle: 10000, // Tempo máximo de inatividade da conexão em ms
  },
  logging: false, // Desativa o log SQL
});

module.exports = sequelize;
