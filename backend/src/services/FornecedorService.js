const { Fornecedor } = require('../models');

class FornecedorService {
  async listarTodos() {
    return await Fornecedor.findAll({
      order: [['nome_fantasia', 'ASC']]
    });
  }

  async criar(dados) {
    const { cnpj } = dados;
    const fornecedorExiste = await Fornecedor.findOne({ where: { cnpj } });
    if (fornecedorExiste) {
      throw new Error('CNPJ já cadastrado.');
    }
    return await Fornecedor.create(dados);
  }

  async deletar(id) {
    const fornecedor = await Fornecedor.findByPk(id);
    if (!fornecedor) {
      throw new Error('Fornecedor não encontrado.');
    }
    await fornecedor.destroy();
    return true;
  }
}

module.exports = new FornecedorService();
