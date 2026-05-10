const { Router } = require('express');
const routes = new Router();

const MovimentacaoController = require('../controllers/movimentacaocontroller');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const { movimentacaoSchema } = require('../requests/MovimentacaoRequest');

routes.use(authMiddleware);

routes.get('/', MovimentacaoController.index);
routes.post('/', validate(movimentacaoSchema), MovimentacaoController.store);

module.exports = routes;
