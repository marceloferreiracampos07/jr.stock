const { Router } = require('express');
const routes = new Router();

const ProdutoController = require('../controllers/produtoscontroller');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const { produtoSchema } = require('../requests/ProdutoRequest');

routes.use(authMiddleware);

routes.get('/', ProdutoController.index);
routes.post('/', validate(produtoSchema), ProdutoController.store);
routes.put('/:id', validate(produtoSchema), ProdutoController.update);

module.exports = routes;
