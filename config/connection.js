require("dotenv").config(); // Carrega variáveis de ambiente
const { Sequelize } = require("sequelize");

// Verifique se a variável de ambiente está definida
const databaseUrl = process.env.DB_URL;

if (!databaseUrl) {
  throw new Error("A variável de ambiente DB_URL não está definida.");
}

console.log("DB_URL:", databaseUrl); // Para depuração

// Inicialize o Sequelize com a URL do banco de dados e opções de SSL
const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions: {
    decimalNumbers: true,
    ssl: {
      require: true, // Requer SSL
      rejectUnauthorized: false, // Opcional: Pode ser necessário dependendo da configuração do banco
    },
  },
  logging: false, // Opcional: desativa o log SQL
});

module.exports = sequelize;
