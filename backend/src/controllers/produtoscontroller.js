const ProdutoService = require('../services/ProdutoService');
const { Produto, Fornecedor } = require('../models');
const ProdutoDTO = require('../dtos/ProdutoDTO');

const service = new ProdutoService({ Produto, Fornecedor });

class ProdutoController {
  async index(req, res) {
    try {
      const produtos = await service.listarTodos();
      return res.json(ProdutoDTO.paraLista(produtos));
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
  }

  async store(req, res) {
    try {
      const produto = await service.criar(req.body);
      return res.status(201).json(ProdutoDTO.paraResposta(produto));
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao cadastrar produto.' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const produto = await service.atualizar(id, req.body);
      return res.json(ProdutoDTO.paraResposta(produto));
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await service.deletar(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ProdutoController();
