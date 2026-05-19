class UsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async listarTodos() {
    return await this.usuarioRepository.findAll({
      attributes: ['id', 'nome', 'email', 'cargo', 'createdAt'],
      order: [['nome', 'ASC']]
    });
  }

  async criar(dados) {
    const { email } = dados;

    const usuarioExiste = await this.usuarioRepository.findByEmail(email);
    if (usuarioExiste) {
      throw new Error('Este e-mail já está em uso.');
    }

    return await this.usuarioRepository.create(dados);
  }

  async atualizar(id, dados) {
    const usuario = await this.usuarioRepository.findWithPassword(id);

    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    if (dados.email && dados.email !== usuario.email) {
      const emailExiste = await this.usuarioRepository.findByEmail(dados.email);
      if (emailExiste) {
        throw new Error('E-mail já está em uso.');
      }
    }

    if (dados.senha && !dados.senhaAntiga) {
      throw new Error('É necessário informar a senha antiga para definir uma nova.');
    }

    if (dados.senhaAntiga && !(await usuario.checkPassword(dados.senhaAntiga))) {
      throw new Error('Senha antiga não confere.');
    }

    await usuario.update(dados);
    return usuario;
  }

  async deletar(id) {
    const deletado = await this.usuarioRepository.destroy({ where: { id } });
    if (!deletado) {
      throw new Error('Usuário não encontrado.');
    }
    return true;
  }
}

module.exports = UsuarioService;
