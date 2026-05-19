const FornecedorDTO = require('../dtos/FornecedorDTO');

class FornecedorController {
  constructor(fornecedorService) {
    this.fornecedorService = fornecedorService;
  }

  async index(req, res) {
    try {
      const fornecedores = await this.fornecedorService.listarTodos();
      return res.json(FornecedorDTO.paraLista(fornecedores));
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar fornecedores.' });
    }
  }

  async store(req, res) {
    try {
      const fornecedor = await this.fornecedorService.criar(req.body);
      return res.status(201).json(FornecedorDTO.paraResposta(fornecedor));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const fornecedor = await this.fornecedorService.atualizar(id, req.body);
      return res.json(FornecedorDTO.paraResposta(fornecedor));
    } catch (error) {
      const status = error.message === 'Fornecedor não encontrado.' ? 404 : 400;
      return res.status(status).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.fornecedorService.deletar(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = FornecedorController;
