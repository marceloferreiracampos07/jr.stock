const { Router } = require('express');
const routes = new Router();

const UsuarioController = require('../controllers/Usuariocontroller');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const { usuarioStoreSchema, usuarioUpdateSchema } = require('../requests/UsuarioRequest');

// Rota pública para cadastro inicial
routes.post('/', validate(usuarioStoreSchema), UsuarioController.store);

// Rotas protegidas
routes.use(authMiddleware);
routes.get('/', UsuarioController.index);
routes.put('/:id', validate(usuarioUpdateSchema), UsuarioController.update);

module.exports = routes;
