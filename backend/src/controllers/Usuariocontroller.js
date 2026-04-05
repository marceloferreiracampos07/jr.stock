const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');

class UsuarioController {
  
  // 1. LISTAR USUÁRIOS (Sem mostrar a senha!)
  async index(req, res) {
    try {
      // O defaultScope que criamos no Model já vai esconder a senha_hash
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nome', 'email', 'cargo', 'created_at']
      });
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }

  // 2. CADASTRAR NOVO USUÁRIO (POST)
  async store(req, res) {
    try {
      const { nome, email, senha, cargo } = req.body;

      // Verifica se o e-mail já existe
      const usuarioExiste = await Usuario.findOne({ where: { email } });
      if (usuarioExiste) {
        return res.status(400).json({ error: 'Este e-mail já está em uso.' });
      }

      // Cria o usuário (o Hook beforeSave no Model vai gerar o hash da senha)
      const usuario = await Usuario.create({
        nome,
        email,
        senha, // Campo VIRTUAL que o Model processa
        cargo
      });

      // Retorna os dados menos a senha
      const { id, nome: n, email: e, cargo: c } = usuario;
      return res.status(201).json({ id, nome: n, email: e, cargo: c });
      
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar usuário. Verifique os dados.' });
    }
  }

  // 3. ATUALIZAR DADOS (PUT)
  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, senhaAntiga } = req.body;

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Se quiser mudar o e-mail, checa se o novo já não existe
      if (email && email !== usuario.email) {
        const emailExiste = await Usuario.findOne({ where: { email } });
        if (emailExiste) {
          return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }
      }

      // Se quiser mudar a senha, pode validar a antiga aqui (opcional)
      await usuario.update(req.body);

      return res.json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
  }

  // 4. DELETAR (DELETE)
  async delete(req, res) {
    try {
      const { id } = req.params;
      await Usuario.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir usuário.' });
    }
  }
}

module.exports = new UsuarioController();