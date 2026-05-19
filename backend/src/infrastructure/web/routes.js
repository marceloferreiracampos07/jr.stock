const { Router } = require('express');
const routes = new Router();

const sessionRoutes = require('../../modules/usuarios/session.routes');
const usuarioRoutes = require('../../modules/usuarios/usuarios.routes');
const fornecedorRoutes = require('../../modules/fornecedores/fornecedores.routes');
const produtoRoutes = require('../../modules/produtos/produtos.routes');
const movimentacaoRoutes = require('../../modules/movimentacoes/movimentacoes.routes');

routes.use(sessionRoutes); 
routes.use('/usuarios', usuarioRoutes);
routes.use('/fornecedores', fornecedorRoutes);
routes.use('/produtos', produtoRoutes);
routes.use('/movimentacoes', movimentacaoRoutes);

module.exports = routes;
