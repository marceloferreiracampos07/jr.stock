const { Produto, Fornecedor } = require('../models');

class ProdutoService {
  async listarTodos() {
    return await Produto.findAll({
      include: [{ model: Fornecedor, as: 'fornecedor', attributes: ['id', 'nome_fantasia'] }],
      order: [['nome', 'ASC']]
    });
  }

  async criar(dados) {
    return await Produto.create(dados);
  }

  async atualizar(id, dados) {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      throw new Error('Produto não encontrado.');
    }
    await produto.update(dados);
    return produto;
  }

  async deletar(id) {
    const deletado = await Produto.destroy({ where: { id } });
    if (!deletado) {
      throw new Error('Produto não encontrado.');
    }
    return true;
  }
}

module.exports = new ProdutoService();
