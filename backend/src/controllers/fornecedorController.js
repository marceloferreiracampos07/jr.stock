const FornecedorService = require('../services/FornecedorService');
const FornecedorDTO = require('../dtos/FornecedorDTO');

class FornecedorController {
  async index(req, res) {
    try {
      const fornecedores = await FornecedorService.listarTodos();
      return res.json(FornecedorDTO.paraLista(fornecedores));
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar fornecedores.' });
    }
  }

  async store(req, res) {
    try {
      const fornecedor = await FornecedorService.criar(req.body);
      return res.status(201).json(FornecedorDTO.paraResposta(fornecedor));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await FornecedorService.deletar(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new FornecedorController();
