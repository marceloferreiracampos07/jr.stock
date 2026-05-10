const { Router } = require('express');
const routes = new Router();

const sessionRoutes = require('./session.routes');
const usuarioRoutes = require('./usuario.routes');
const fornecedorRoutes = require('./fornecedor.routes');
const produtoRoutes = require('./produto.routes');
const movimentacaoRoutes = require('./movimentacao.routes');

routes.use(sessionRoutes); // /login
routes.use('/usuarios', usuarioRoutes);
routes.use('/fornecedores', fornecedorRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/movimentacoes', movimentacaoRoutes);

module.exports = routes;
