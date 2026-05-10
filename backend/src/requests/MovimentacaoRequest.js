const yup = require('yup');

const movimentacaoSchema = yup.object().shape({
  tipo: yup.string().oneOf(['entrada', 'saida'], "O tipo deve ser 'entrada' ou 'saida'").required('O tipo é obrigatório'),
  quantidade: yup.number().positive('A quantidade deve ser positiva').required('A quantidade é obrigatória'),
  motivo: yup.string(),
  produto_id: yup.number().integer().positive().required('O ID do produto é obrigatório'),
});

module.exports = { movimentacaoSchema };
