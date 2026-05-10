const { Router } = require('express');
const routes = new Router();

const FornecedorController = require('../controllers/fornecedorController');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');
const validate = require('../middlewares/validation');
const { fornecedorSchema } = require('../requests/FornecedorRequest');

routes.use(authMiddleware);

routes.get('/', FornecedorController.index);
routes.post('/', validate(fornecedorSchema), FornecedorController.store);
routes.delete('/:id', adminMiddleware, FornecedorController.delete);

module.exports = routes;
