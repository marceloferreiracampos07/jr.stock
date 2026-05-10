const ProdutoService = require('../services/ProdutoService');
const ProdutoDTO = require('../dtos/ProdutoDTO');

class ProdutoController {
  async index(req, res) {
    try {
      const produtos = await ProdutoService.listarTodos();
      return res.json(ProdutoDTO.paraLista(produtos));
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
  }

  async store(req, res) {
    try {
      const produto = await ProdutoService.criar(req.body);
      return res.status(201).json(ProdutoDTO.paraResposta(produto));
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao cadastrar produto.' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const produto = await ProdutoService.atualizar(id, req.body);
      return res.json(ProdutoDTO.paraResposta(produto));
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ProdutoService.deletar(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ProdutoController();
