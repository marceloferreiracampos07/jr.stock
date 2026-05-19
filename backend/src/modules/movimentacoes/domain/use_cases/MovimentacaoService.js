class MovimentacaoService {
  constructor(movimentacaoRepository, produtoRepository) {
    this.movimentacaoRepository = movimentacaoRepository;
    this.produtoRepository = produtoRepository;
  }

  async listarTodas() {
    return await this.movimentacaoRepository.findAll({
      include: ['produto'],
      order: [['data_movimentacao', 'DESC']]
    });
  }

  async criar(dados) {
    // Lógica para atualizar estoque do produto ao criar movimentação
    const { produto_id, quantidade, tipo } = dados;
    
    const produto = await this.produtoRepository.findByPk(produto_id);
    if (!produto) {
      throw new Error('Produto não encontrado.');
    }

    if (tipo === 'saida' && produto.quantidade < quantidade) {
      throw new Error('Saldo insuficiente em estoque.');
    }

    // Aqui poderíamos usar uma transaction, mas para manter similar ao original:
    const movimentacao = await this.movimentacaoRepository.create(dados);
    
    const novaQuantidade = tipo === 'entrada' 
      ? Number(produto.quantidade) + Number(quantidade)
      : Number(produto.quantidade) - Number(quantidade);

    await produto.update({ quantidade: novaQuantidade });

    return movimentacao;
  }
}

module.exports = MovimentacaoService;
