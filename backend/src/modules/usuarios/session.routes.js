const { Router } = require('express');
const routes = new Router();

const SessionController = require('./adapters/controllers/SessionController');
const SequelizeUsuarioRepository = require('./adapters/repositories/SequelizeUsuarioRepository');
const { Usuario } = require('../../infrastructure/database/models');
const validate = require('../../infrastructure/web/middlewares/validation');
const { sessionSchema } = require('./adapters/validations/SessionRequest');

// Injeção de Dependência
const usuarioRepository = new SequelizeUsuarioRepository(Usuario);
const sessionController = new SessionController(usuarioRepository);

routes.post('/sessions', validate(sessionSchema), (req, res) => sessionController.store(req, res));

module.exports = routes;
