class SequelizeProdutoRepository {
  constructor(ProdutoModel) {
    this.Produto = ProdutoModel;
  }

  async findByPk(id, options = {}) {
    return await this.Produto.findByPk(id, options);
  }

  async findAll(options = {}) {
    return await this.Produto.findAll(options);
  }

  async create(data, options = {}) {
    return await this.Produto.create(data, options);
  }

  async destroy(options) {
    return await this.Produto.destroy(options);
  }
  
  async getTransaction() {
    return await this.Produto.sequelize.transaction();
  }
}

module.exports = SequelizeProdutoRepository;
