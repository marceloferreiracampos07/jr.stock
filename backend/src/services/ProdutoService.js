class ProdutoService {
  constructor(models) {
    this.Produto = models.Produto;
    this.Fornecedor = models.Fornecedor;
    this.Movimentacao = models.Movimentacao;
    this.sequelize = this.Produto.sequelize;
  }

  async listarTodos() {
    return await this.Produto.findAll({
      include: [{ model: this.Fornecedor, as: 'fornecedor', attributes: ['id', 'nome_fantasia'] }],
      order: [['nome', 'ASC']]
    });
  }

  async criar(dados) {
    return await this.Produto.create(dados);
  }

  async atualizar(id, dados) {
    const produto = await this.Produto.findByPk(id);
    if (!produto) {
      throw new Error('Produto não encontrado.');
    }
    return await produto.update(dados);
  }

  async deletar(id) {
    const deletado = await this.Produto.destroy({ where: { id } });
    if (!deletado) {
      throw new Error('Produto não encontrado.');
    }
    return true;
  }

  async registrarSaida(id, quantidade) {
    const transaction = await this.sequelize.transaction();
    try {
      const produto = await this.Produto.findByPk(id, { transaction });
      if (!produto) {
        throw new Error('Produto não encontrado.');
      }
      if (produto.quantidade < quantidade) {
        throw new Error('Saldo insuficiente');
      }
      const novaQuantidade = produto.quantidade - quantidade;
      const updatedProduto = await produto.update({ quantidade: novaQuantidade }, { transaction });
      
      await this.Movimentacao.create({
        produto_id: id,
        quantidade,
        tipo: 'SAIDA'
      }, { transaction });

      await transaction.commit();
      return updatedProduto;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export default ProdutoService;
