const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Fornecedor extends Model {}

Fornecedor.init({
  
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
    unique: true, 
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
  tableName: 'fornecedores', 
  underscored: true 
});

module.exports = Fornecedor;