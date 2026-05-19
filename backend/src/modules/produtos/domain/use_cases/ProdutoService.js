class ProdutoService {
  constructor(produtoRepository, movimentacaoRepository) {
    this.produtoRepository = produtoRepository;
    this.movimentacaoRepository = movimentacaoRepository;
  }

  async listarTodos() {
    // Nota: O include deve ser tratado pelo repositório ou passado como opção
    // Para simplificar agora, mantemos a estrutura mas o ideal seria o repo abstrair isso
    return await this.produtoRepository.findAll({
      include: ['fornecedor'], // 'fornecedor' é o alias definido no model/index.js
      order: [['nome', 'ASC']]
    });
  }

  async criar(dados) {
    return await this.produtoRepository.create(dados);
  }

  async atualizar(id, dados) {
    const produto = await this.produtoRepository.findByPk(id);
    if (!produto) {
      throw new Error('Produto não encontrado.');
    }
    return await produto.update(dados);
  }

  async deletar(id) {
    const deletado = await this.produtoRepository.destroy({ where: { id } });
    if (!deletado) {
      throw new Error('Produto não encontrado.');
    }
    return true;
  }

  async registrarSaida(id, quantidade) {
    const transaction = await this.produtoRepository.getTransaction();
    try {
      const produto = await this.produtoRepository.findByPk(id, { transaction });
      if (!produto) {
        throw new Error('Produto não encontrado.');
      }
      if (produto.quantidade < quantidade) {
        throw new Error('Saldo insuficiente');
      }
      
      const novaQuantidade = Number(produto.quantidade) - Number(quantidade);
      const updatedProduto = await produto.update({ quantidade: novaQuantidade }, { transaction });
      
      await this.movimentacaoRepository.create({
        produto_id: id,
        quantidade,
        tipo: 'saida' // 'saida' ou 'entrada' conforme o enum no model
      }, { transaction });

      await transaction.commit();
      return updatedProduto;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = ProdutoService;
