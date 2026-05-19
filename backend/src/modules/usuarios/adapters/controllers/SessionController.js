const jwt = require('jsonwebtoken');

class SessionController {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async store(req, res) {
    const { email, senha } = req.body;

    const usuario = await this.usuarioRepository.findByEmail(email);

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

module.exports = SessionController;
