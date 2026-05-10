class MovimentacaoDTO {
  static paraResposta(movimentacao) {
    if (!movimentacao) return null;
    return {
      id: movimentacao.id,
      tipo: movimentacao.tipo,
      quantidade: movimentacao.quantidade,
      motivo: movimentacao.motivo,
      data: movimentacao.createdAt,
      produto: movimentacao.produto ? {
        id: movimentacao.produto.id,
        nome: movimentacao.produto.nome
      } : null,
      usuario: movimentacao.usuario ? {
        id: movimentacao.usuario.id,
        nome: movimentacao.usuario.nome
      } : null,
    };
  }

  static paraLista(movimentacoes) {
    return movimentacoes.map((m) => this.paraResposta(m));
  }
}

module.exports = MovimentacaoDTO;
