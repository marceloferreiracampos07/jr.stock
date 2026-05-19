const MovimentacaoDTO = require('../dtos/MovimentacaoDTO');

class MovimentacaoController {
  constructor(movimentacaoService) {
    this.movimentacaoService = movimentacaoService;
  }

  async index(req, res) {
    try {
      const movimentacoes = await this.movimentacaoService.listarTodas();
      return res.json(MovimentacaoDTO.paraLista(movimentacoes));
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar movimentações.' });
    }
  }

  async store(req, res) {
    try {
      const movimentacao = await this.movimentacaoService.criar(req.body);
      return res.status(201).json(MovimentacaoDTO.paraResposta(movimentacao));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = MovimentacaoController;
