const UsuarioDTO = require('../dtos/UsuarioDTO');

class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
  }
  
  async index(req, res) {
    try {
      const usuarios = await this.usuarioService.listarTodos();
      return res.json(UsuarioDTO.paraLista(usuarios));
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }

  async store(req, res) {
    try {
      const usuario = await this.usuarioService.criar(req.body);
      return res.status(201).json(UsuarioDTO.paraResposta(usuario));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuario = await this.usuarioService.atualizar(id, req.body);
      return res.json(UsuarioDTO.paraResposta(usuario));
    } catch (error) {
      const status = error.message === 'Usuário não encontrado.' ? 404 : 401;
      return res.status(status).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.usuarioService.deletar(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = UsuarioController;
