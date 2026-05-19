const ProdutoDTO = require('../dtos/ProdutoDTO');

class ProdutoController {
  constructor(produtoService) {
    this.produtoService = produtoService;
  }

  async index(req, res) {
    try {
      const produtos = await this.produtoService.listarTodos();
      return res.json(ProdutoDTO.paraLista(produtos));
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
  }

  async store(req, res) {
    try {
      const produto = await this.produtoService.criar(req.body);
      return res.status(201).json(ProdutoDTO.paraResposta(produto));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const produto = await this.produtoService.atualizar(id, req.body);
      return res.json(ProdutoDTO.paraResposta(produto));
    } catch (error) {
      const status = error.message === 'Produto não encontrado.' ? 404 : 400;
      return res.status(status).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.produtoService.deletar(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async registerExit(req, res) {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;
      const produto = await this.produtoService.registrarSaida(id, quantidade);
      return res.json(ProdutoDTO.paraResposta(produto));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProdutoController;
