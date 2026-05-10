const MovimentacaoService = require('../services/MovimentacaoService');
const MovimentacaoDTO = require('../dtos/MovimentacaoDTO');

class MovimentacaoController {
  async index(req, res) {
    try {
      const logs = await MovimentacaoService.listarTodos();
      return res.json(MovimentacaoDTO.paraLista(logs));
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao buscar logs.' });
    }
  }

  async store(req, res) {
    try {
      const usuario_id = req.userId;
      const movimentacao = await MovimentacaoService.criar(req.body, usuario_id);
      return res.status(201).json(MovimentacaoDTO.paraResposta(movimentacao));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new MovimentacaoController();
