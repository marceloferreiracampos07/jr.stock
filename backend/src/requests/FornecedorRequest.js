const yup = require('yup');

const fornecedorSchema = yup.object().shape({
  nome_fantasia: yup.string().required('O nome fantasia é obrigatório'),
  cnpj: yup.string().required('O CNPJ é obrigatório'),
  contato: yup.string(),
  categoria: yup.string().default('Geral'),
});

module.exports = { fornecedorSchema };
