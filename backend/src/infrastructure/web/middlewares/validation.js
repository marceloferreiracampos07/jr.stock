module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    return next();
  } catch (err) {
    return res.status(400).json({
      error: 'Falha na validação dos dados',
      messages: err.inner.map((error) => ({
        field: error.path,
        message: error.message,
      })),
    });
  }
};
