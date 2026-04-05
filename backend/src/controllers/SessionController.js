const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

class SessionController {
  async store(req, res) {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (!(await usuario.checkPassword(senha))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const { id, nome, cargo } = usuario;

    return res.json({
      usuario: {
        id,
        nome,
        email,
        cargo,
      },
      token: jwt.sign({ id }, process.env.APP_SECRET, {
        expiresIn: '7d',
      }),
    });
  }
}

module.exports = new SessionController();