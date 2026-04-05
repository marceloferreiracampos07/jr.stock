module.exports = async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      message: err.message,
      stack: err.stack
    });
  }

  return res.status(500).json({ error: 'Erro interno do servidor.' });
};module.exports = async (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
    return res.status(500).json({
      error: 'Erro interno do servidor',
      message: err.message,
      stack: err.stack
    });
  }

  return res.status(500).json({ error: 'Erro interno do servidor.' });
};