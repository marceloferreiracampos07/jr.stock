const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para ler o arquivo .env

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nome do banco (ex: estoque_db)
  process.env.DB_USER,      // Usuário (ex: root)
  process.env.DB_PASS,      // Senha
  {
    host: process.env.DB_HOST, // Geralmente localhost
    dialect: 'mysql',
    logging: false,            // Desativa os logs de SQL no console (deixe true se quiser ver as queries)
    define: {
      timestamps: true,        // Cria createdAt e updatedAt automaticamente
      underscored: true,       // Usa snake_case (nome_produto) em vez de camelCase
      underscoredAll: true
    },
    pool: {
      max: 5,                  // Máximo de conexões simultâneas
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;