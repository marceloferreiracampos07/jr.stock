class SequelizeUsuarioRepository {
  constructor(UsuarioModel) {
    this.Usuario = UsuarioModel;
  }

  async findByPk(id, options = {}) {
    return await this.Usuario.findByPk(id, options);
  }

  async findOne(options) {
    return await this.Usuario.findOne(options);
  }

  async findAll(options) {
    return await this.Usuario.findAll(options);
  }

  async create(data) {
    return await this.Usuario.create(data);
  }

  async destroy(options) {
    return await this.Usuario.destroy(options);
  }

  async findByEmail(email) {
    return await this.Usuario.findOne({ where: { email } });
  }
  
  async findWithPassword(id) {
    return await this.Usuario.scope('withPassword').findByPk(id);
  }
}

module.exports = SequelizeUsuarioRepository;
