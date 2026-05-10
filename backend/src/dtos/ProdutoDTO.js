class ProdutoDTO {
  static paraResposta(produto) {
    if (!produto) return null;
    return {
      id: produto.id,
      nome: produto.nome,
      preco_custo: produto.preco_custo,
      preco_venda: produto.preco_venda,
      estoque_atual: produto.estoque_atual,
      estoque_minimo: produto.estoque_minimo,
      unidade_medida: produto.unidade_medida,
      fornecedor: produto.fornecedor ? {
        id: produto.fornecedor.id,
        nome: produto.fornecedor.nome_fantasia
      } : null,
      criado_em: produto.createdAt,
    };
  }

  static paraLista(produtos) {
    return produtos.map((p) => this.paraResposta(p));
  }
}

module.exports = ProdutoDTO;
