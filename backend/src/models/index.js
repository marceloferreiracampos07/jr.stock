// Dentro de backend/models/index.js
const Fornecedor = require('./Fornecedor');
const Produto = require('./Produto');
const Usuario = require('./Usuario');
const Movimentacao = require('./Movimentacao');

// Um Produto pertence a um Fornecedor
Produto.belongsTo(Fornecedor, { foreignKey: 'fornecedor_id', as: 'fornecedor' });
Fornecedor.hasMany(Produto, { foreignKey: 'fornecedor_id', as: 'produtos' });

// Uma Movimentação pertence a um Produto e a um Usuário
Movimentacao.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Opcional: Ver todas as movimentações de um produto
Produto.hasMany(Movimentacao, { foreignKey: 'produto_id', as: 'historico' });

module.exports = {
  Fornecedor,
  Produto,
  Usuario,
  Movimentacao
};