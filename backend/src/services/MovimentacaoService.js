const { Movimentacao, Produto, Usuario, sequelize } = require('../models');

class MovimentacaoService {
  async listarTodos() {
    return await Movimentacao.findAll({
      include: [
        { model: Produto, as: 'produto', attributes: ['id', 'nome'] },
        { model: Usuario, as: 'usuario', attributes: ['id', 'nome'] }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async criar(dados, usuario_id) {
    const t = await sequelize.transaction();
    try {
      const { tipo, quantidade, produto_id, motivo } = dados;

      const produto = await Produto.findByPk(produto_id, { transaction: t });
      if (!produto) {
        throw new Error('Produto não encontrado.');
      }

      const qtdNumerica = Number(quantidade);
      let novoEstoque = Number(produto.estoque_atual);

      if (tipo === 'entrada') {
        novoEstoque += qtdNumerica;
      } else {
        if (novoEstoque < qtdNumerica) {
          throw new Error('Estoque insuficiente.');
        }
        novoEstoque -= qtdNumerica;
      }

      const movimentacao = await Movimentacao.create({
        tipo,
        quantidade: qtdNumerica,
        motivo,
        produto_id,
        usuario_id
      }, { transaction: t });

      await produto.update({ estoque_atual: novoEstoque }, { transaction: t });

      await t.commit();
      return movimentacao;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = new MovimentacaoService();
