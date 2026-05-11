
const Fornecedor = require('./fornecedormodel');
const Produto = require('./Produtosmodel');
const Usuario = require('./Usuariomodel');
const Movimentacao = require('./movimentacaomodels');


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