const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Produto extends Model {}

Produto.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  preco_custo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  preco_venda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  estoque_atual: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  estoque_minimo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 5.00 // Avisa quando chegar em 5 itens
  },
  unidade_medida: {
    type: DataTypes.STRING,
    defaultValue: 'un', // un, kg, lt, pct
  },
  // A chave estrangeira (fornecedor_id) o Sequelize pode criar sozinho 
  // por causa da relação no index.js, mas é bom declarar aqui para clareza:
  fornecedor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'fornecedores',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Produto',
  tableName: 'produtos',
  underscored: true,
});

module.exports = Produto;