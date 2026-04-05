const { Movimentacao, Produto, Usuario } = require('../models');
const sequelize = require('../config/db'); // Importamos para usar Transactions

class MovimentacaoController {
  
  // 1. LISTAR O HISTÓRICO (Logs)
  async index(req, res) {
    try {
      const logs = await Movimentacao.findAll({
        include: [
          { model: Produto, as: 'produto', attributes: ['nome'] },
          { model: Usuario, as: 'usuario', attributes: ['nome'] }
        ],
        order: [['created_at', 'DESC']]
      });
      return res.json(logs);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar logs de movimentação.' });
    }
  }

  // 2. REGISTRAR ENTRADA OU SAÍDA (Onde a mágica acontece)
  async store(req, res) {
    // Usamos TRANSACTION para garantir que, se o estoque não atualizar, o log também não seja salvo
    const t = await sequelize.transaction();

    try {
      const { tipo, quantidade, motivo, produto_id, usuario_id } = req.body;

      // 1. Acha o produto para mexer no estoque
      const produto = await Produto.findByPk(produto_id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

      // 2. Lógica de cálculo de estoque
      let novoEstoque = Number(produto.estoque_atual);
      if (tipo === 'entrada') {
        novoEstoque += Number(quantidade);
      } else if (tipo === 'saida') {
        if (novoEstoque < quantidade) {
          return res.status(400).json({ error: 'Estoque insuficiente para essa saída.' });
        }
        novoEstoque -= Number(quantidade);
      }

      // 3. Salva o Log da Movimentação
      const movimentacao = await Movimentacao.create({
        tipo,
        quantidade,
        motivo,
        produto_id,
        usuario_id
      }, { transaction: t });

      // 4. Atualiza o saldo no Produto
      await produto.update({ estoque_atual: novoEstoque }, { transaction: t });

      // Se chegou aqui sem erro, confirma as duas alterações no banco
      await t.commit();

      return res.status(201).json(movimentacao);

    } catch (error) {
      // Se der qualquer erro, desfaz tudo o que foi feito no banco (Rollback)
      await t.rollback();
      console.error(error);
      return res.status(500).json({ error: 'Erro ao processar movimentação.' });
    }
  }
}

module.exports = new MovimentacaoController();