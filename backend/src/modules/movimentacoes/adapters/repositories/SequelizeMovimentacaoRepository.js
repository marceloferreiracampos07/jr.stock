class SequelizeMovimentacaoRepository {
  constructor(MovimentacaoModel) {
    this.Movimentacao = MovimentacaoModel;
  }

  async create(data, options = {}) {
    return await this.Movimentacao.create(data, options);
  }

  async findAll(options = {}) {
    return await this.Movimentacao.findAll(options);
  }
}

module.exports = SequelizeMovimentacaoRepository;
