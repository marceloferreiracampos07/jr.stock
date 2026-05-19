class FornecedorService {
  constructor(fornecedorRepository) {
    this.fornecedorRepository = fornecedorRepository;
  }

  async listarTodos() {
    return await this.fornecedorRepository.findAll({
      order: [['nome_fantasia', 'ASC']]
    });
  }

  async criar(dados) {
    return await this.fornecedorRepository.create(dados);
  }

  async atualizar(id, dados) {
    const fornecedor = await this.fornecedorRepository.findByPk(id);
    if (!fornecedor) {
      throw new Error('Fornecedor não encontrado.');
    }
    return await fornecedor.update(dados);
  }

  async deletar(id) {
    const deletado = await this.fornecedorRepository.destroy({ where: { id } });
    if (!deletado) {
      throw new Error('Fornecedor não encontrado.');
    }
    return true;
  }
}

module.exports = FornecedorService;
