const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Fornecedor extends Model {}

Fornecedor.init({
  // O ID o Sequelize cria sozinho, não precisa colocar aqui
  nome_fantasia: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Impede CNPJs duplicados
    validate: {
      notEmpty: true
    }
  },
  contato: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING,
    defaultValue: 'Geral'
  }
}, {
  sequelize,
  modelName: 'Fornecedor',
  tableName: 'fornecedores', // Nome real da tabela no MySQL
  underscored: true // created_at, updated_at
});

module.exports = Fornecedor;