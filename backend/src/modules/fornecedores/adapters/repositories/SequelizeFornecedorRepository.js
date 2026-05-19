class SequelizeFornecedorRepository {
  constructor(FornecedorModel) {
    this.Fornecedor = FornecedorModel;
  }

  async findByPk(id, options = {}) {
    return await this.Fornecedor.findByPk(id, options);
  }

  async findAll(options = {}) {
    return await this.Fornecedor.findAll(options);
  }

  async create(data) {
    return await this.Fornecedor.create(data);
  }

  async destroy(options) {
    return await this.Fornecedor.destroy(options);
  }
}

module.exports = SequelizeFornecedorRepository;
