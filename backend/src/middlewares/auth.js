const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { id, cargo } = decoded;

    req.userId = id;
    req.userCargo = cargo;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};