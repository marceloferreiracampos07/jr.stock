const UsuarioService = require('../services/UsuarioService');
const UsuarioDTO = require('../dtos/UsuarioDTO');

class UsuarioController {
  
  // LISTAR TODOS
  async index(req, res) {
    try {
      const usuarios = await UsuarioService.listarTodos();
      return res.json(UsuarioDTO.paraLista(usuarios));
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }

  // CADASTRAR NOVO
  async store(req, res) {
    try {
      const usuario = await UsuarioService.criar(req.body);
      return res.status(201).json(UsuarioDTO.paraResposta(usuario));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // ATUALIZAR
  async update(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.atualizar(id, req.body);
      return res.json(UsuarioDTO.paraResposta(usuario));
    } catch (error) {
      const status = error.message === 'Usuário não encontrado.' ? 404 : 401;
      return res.status(status).json({ error: error.message });
    }
  }

  // DELETAR
  async delete(req, res) {
    try {
      const { id } = req.params;
      await UsuarioService.deletar(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new UsuarioController();
