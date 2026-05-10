const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Movimentacao extends Model {}

Movimentacao.init({
  
  tipo: {
    type: DataTypes.ENUM('entrada', 'saida'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['entrada', 'saida']],
        msg: "O tipo deve ser 'entrada' ou 'saida'."
      }
    }
  },
  quantidade: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Ex: Venda, Reposição, Perda, Ajuste de Inventário'
  },
  data_movimentacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produtos',
      key: 'id'
    }
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Movimentacao',
  tableName: 'movimentacoes',
  underscored: true,
});

module.exports = Movimentacao;