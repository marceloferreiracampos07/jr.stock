const yup = require('yup');

const produtoSchema = yup.object().shape({
  nome: yup.string().required('O nome do produto é obrigatório'),
  preco_custo: yup.number().positive('Preço de custo deve ser positivo').required('Preço de custo é obrigatório'),
  preco_venda: yup.number().positive('Preço de venda deve ser positivo').required('Preço de venda é obrigatório'),
  estoque_atual: yup.number().integer().min(0, 'Estoque não pode ser negativo').required('Estoque atual é obrigatório'),
  estoque_minimo: yup.number().integer().min(0, 'Estoque mínimo não pode ser negativo').default(0),
  unidade_medida: yup.string().required('Unidade de medida é obrigatória'),
  fornecedor_id: yup.number().integer().positive().required('O ID do fornecedor é obrigatório'),
});

module.exports = { produtoSchema };
