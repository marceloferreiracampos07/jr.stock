const yup = require('yup');

const usuarioStoreSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('A senha é obrigatória'),
  cargo: yup.string().oneOf(['admin', 'vendedor'], 'Cargo inválido').default('vendedor'),
});

const usuarioUpdateSchema = yup.object().shape({
  nome: yup.string(),
  email: yup.string().email('E-mail inválido'),
  senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  cargo: yup.string().oneOf(['admin', 'vendedor'], 'Cargo inválido'),
});

module.exports = { usuarioStoreSchema, usuarioUpdateSchema };
