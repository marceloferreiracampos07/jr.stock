const logger = require('../config/logger');

module.exports = async (err, req, res, next) => {
  // Registra o erro no Winston (salva no arquivo logs/error.log)
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body
  });

  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({
      error: 'Erro interno do servidor',
      message: err.message,
      stack: err.stack
    });
  }

  return res.status(500).json({ error: 'Erro interno do servidor.' });
};
