class FornecedorDTO {
  static paraResposta(fornecedor) {
    if (!fornecedor) return null;
    return {
      id: fornecedor.id,
      nome_fantasia: fornecedor.nome_fantasia,
      cnpj: fornecedor.cnpj,
      contato: fornecedor.contato,
      categoria: fornecedor.categoria,
      criado_em: fornecedor.createdAt,
    };
  }

  static paraLista(fornecedores) {
    return fornecedores.map((f) => this.paraResposta(f));
  }
}

module.exports = FornecedorDTO;
