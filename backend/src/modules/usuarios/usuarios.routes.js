const { Router } = require('express');
const routes = new Router();

const UsuarioController = require('./adapters/controllers/Usuariocontroller');
const UsuarioService = require('./domain/use_cases/UsuarioService');
const SequelizeUsuarioRepository = require('./adapters/repositories/SequelizeUsuarioRepository');
const { Usuario } = require('../../infrastructure/database/models');

const authMiddleware = require('../../infrastructure/web/middlewares/auth');
const gate = require('../../infrastructure/security/gates');
const validate = require('../../infrastructure/web/middlewares/validation');
const { usuarioStoreSchema, usuarioUpdateSchema } = require('./adapters/validations/UsuarioRequest');

// Injeção de Dependência
const usuarioRepository = new SequelizeUsuarioRepository(Usuario);
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService);

routes.post('/', validate(usuarioStoreSchema), (req, res) => usuarioController.store(req, res));

routes.use(authMiddleware);

routes.get('/', gate.authorize('manage-users'), (req, res) => usuarioController.index(req, res));
routes.put('/:id', gate.authorize('manage-users'), validate(usuarioUpdateSchema), (req, res) => usuarioController.update(req, res));
routes.delete('/:id', gate.authorize('manage-users'), (req, res) => usuarioController.delete(req, res));

module.exports = routes;
