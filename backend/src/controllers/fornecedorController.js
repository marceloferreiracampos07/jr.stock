const Fornecedor = require('../models/Fornecedor');

class FornecedorController {
  
  // 1. LISTAR TODOS (GET /fornecedores)
  async index(req, res) {
    try {
      const fornecedores = await Fornecedor.findAll({
        order: [['nome_fantasia', 'ASC']]
      });
      return res.json(fornecedores);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar fornecedores.' });
    }
  }

  // 2. CRIAR UM NOVO (POST /fornecedores)
  async store(req, res) {
    try {
      const { nome_fantasia, cnpj, contato, categoria } = req.body;
      
      // Verifica se o CNPJ já existe antes de tentar criar
      const existe = await Fornecedor.findOne({ where: { cnpj } });
      if (existe) {
        return res.status(400).json({ error: 'Este CNPJ já está cadastrado.' });
      }

      const novoFornecedor = await Fornecedor.create({
        nome_fantasia,
        cnpj,
        contato,
        categoria
      });

      return res.status(201).json(novoFornecedor);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao cadastrar. Verifique os campos.' });
    }
  }

  // 3. ATUALIZAR (PUT /fornecedores/:id)
  async update(req, res) {
    try {
      const { id } = req.params;
      const fornecedor = await Fornecedor.findByPk(id);

      if (!fornecedor) {
        return res.status(404).json({ error: 'Fornecedor não encontrado.' });
      }

      await fornecedor.update(req.body);
      return res.json(fornecedor);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar dados.' });
    }
  }

  // 4. DELETAR (DELETE /fornecedores/:id)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletado = await Fornecedor.destroy({ where: { id } });

      if (!deletado) {
        return res.status(404).json({ error: 'Fornecedor não encontrado.' });
      }

      return res.status(204).send(); // Sucesso sem conteúdo
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir fornecedor.' });
    }
  }
}

// Exporta uma instância da classe
module.exports = new FornecedorController();