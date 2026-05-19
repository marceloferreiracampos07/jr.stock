const yup = require('yup');

const sessionStoreSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  senha: yup.string().required('A senha é obrigatória'),
});

module.exports = { sessionStoreSchema };
