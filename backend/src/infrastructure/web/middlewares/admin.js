const Usuario = require('../../database/models/Usuariomodel');

module.exports = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId);

    if (!usuario || usuario.cargo !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao verificar permissão do usuário.' });
  }
};