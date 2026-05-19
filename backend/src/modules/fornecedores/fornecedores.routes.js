const { Router } = require('express');
const routes = new Router();

const FornecedorController = require('./adapters/controllers/fornecedorController');
const FornecedorService = require('./domain/use_cases/FornecedorService');
const SequelizeFornecedorRepository = require('./adapters/repositories/SequelizeFornecedorRepository');
const { Fornecedor } = require('../../infrastructure/database/models');

const authMiddleware = require('../../infrastructure/web/middlewares/auth');
const gate = require('../../infrastructure/security/gates');
const validate = require('../../infrastructure/web/middlewares/validation');
const { fornecedorSchema } = require('./adapters/validations/FornecedorRequest');

// Injeção de Dependência
const fornecedorRepository = new SequelizeFornecedorRepository(Fornecedor);
const fornecedorService = new FornecedorService(fornecedorRepository);
const fornecedorController = new FornecedorController(fornecedorService);

routes.use(authMiddleware);

routes.get('/', (req, res) => fornecedorController.index(req, res));
routes.post('/', validate(fornecedorSchema), (req, res) => fornecedorController.store(req, res));
routes.put('/:id', validate(fornecedorSchema), (req, res) => fornecedorController.update(req, res));
routes.delete('/:id', gate.authorize('delete-fornecedor'), (req, res) => fornecedorController.delete(req, res));

module.exports = routes;
