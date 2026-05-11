class FornecedorService {
  constructor(models) {
    this.Fornecedor = models.Fornecedor;
  }

  async listarTodos() {
    return await this.Fornecedor.findAll({
      order: [['nome_fantasia', 'ASC']]
    });
  }

  async criar(dados) {
    const { cnpj } = dados;
    const fornecedorExiste = await this.Fornecedor.findOne({ where: { cnpj } });
    if (fornecedorExiste) {
      throw new Error('CNPJ já cadastrado.');
    }
    return await this.Fornecedor.create(dados);
  }

  async deletar(id) {
    const fornecedor = await this.Fornecedor.findByPk(id);
    if (!fornecedor) {
      throw new Error('Fornecedor não encontrado.');
    }
    await fornecedor.destroy();
    return true;
  }
}

export default FornecedorService;
