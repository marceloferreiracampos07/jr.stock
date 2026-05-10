const { Usuario } = require('../models');

class UsuarioService {
  async listarTodos() {
    return await Usuario.findAll({
      attributes: ['id', 'nome', 'email', 'cargo', 'createdAt'],
      order: [['nome', 'ASC']]
    });
  }

  async criar(dados) {
    const { email } = dados;

    const usuarioExiste = await Usuario.findOne({ where: { email } });
    if (usuarioExiste) {
      throw new Error('Este e-mail já está em uso.');
    }

    const usuario = await Usuario.create(dados);
    return usuario;
  }

  async atualizar(id, dados) {
    const usuario = await Usuario.scope('withPassword').findByPk(id);

    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    if (dados.email && dados.email !== usuario.email) {
      const emailExiste = await Usuario.findOne({ where: { email: dados.email } });
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
    const deletado = await Usuario.destroy({ where: { id } });
    if (!deletado) {
      throw new Error('Usuário não encontrado.');
    }
    return true;
  }
}

module.exports = new UsuarioService();
