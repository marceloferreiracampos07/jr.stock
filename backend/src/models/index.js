
const Fornecedor = require('./Fornecedor');
const Produto = require('./Produto');
const Usuario = require('./Usuario');
const Movimentacao = require('./Movimentacao');


Produto.belongsTo(Fornecedor, { foreignKey: 'fornecedor_id', as: 'fornecedor' });
Fornecedor.hasMany(Produto, { foreignKey: 'fornecedor_id', as: 'produtos' });


Movimentacao.belongsTo(Produto, { foreignKey: 'produto_id', as: 'produto' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });


Produto.hasMany(Movimentacao, { foreignKey: 'produto_id', as: 'historico' });

module.exports = {
  Fornecedor,
  Produto,
  Usuario,
  Movimentacao
};