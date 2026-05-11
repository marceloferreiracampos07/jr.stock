const FornecedorService = require('../services/FornecedorService').default;
const { Fornecedor } = require('../models');

const service = new FornecedorService({ Fornecedor });

class FornecedorController {
  async index(req, res) {
    try {
      const fornecedores = await service.listarTodos();
      return res.json(fornecedores);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar fornecedores.' });
    }
  }

  async store(req, res) {
    try {
      const fornecedor = await service.criar(req.body);
      return res.status(201).json(fornecedor);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await service.deletar(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new FornecedorController();

module.exports = new FornecedorController();
