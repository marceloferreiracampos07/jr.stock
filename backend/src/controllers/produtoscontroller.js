const { Produto, Fornecedor } = require('../models');

class ProdutoController {
  
  // LISTAR TODOS (Com os dados do Fornecedor junto!)
  async index(req, res) {
    try {
      const produtos = await Produto.findAll({
        include: [{ model: Fornecedor, as: 'fornecedor', attributes: ['nome_fantasia'] }],
        order: [['nome', 'ASC']]
      });
      return res.json(produtos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
  }

  // CRIAR NOVO (POST)
  async store(req, res) {
    try {
      const { 
        nome, preco_custo, preco_venda, estoque_atual, 
        estoque_minimo, unidade_medida, fornecedor_id 
      } = req.body;

      // Cria o produto no MySQL
      const produto = await Produto.create({
        nome,
        preco_custo,
        preco_venda,
        estoque_atual,
        estoque_minimo,
        unidade_medida,
        fornecedor_id
      });

      return res.status(201).json(produto);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Erro ao cadastrar produto. Verifique os dados.' });
    }
  }

  // ATUALIZAR (PUT)
  async update(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      await produto.update(req.body);
      return res.json(produto);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
  }

  // EXCLUIR (DELETE)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletado = await Produto.destroy({ where: { id } });

      if (!deletado) return res.status(404).json({ error: 'Produto não encontrado.' });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir.' });
    }
  }
}

module.exports = new ProdutoController();