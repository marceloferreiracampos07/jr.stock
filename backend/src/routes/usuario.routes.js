const { Router } = require('express');
const routes = new Router();

const UsuarioController = require('../controllers/Usuariocontroller');
const authMiddleware = require('../middlewares/auth');
const gate = require('../gates');
const validate = require('../middlewares/validation');
const { usuarioStoreSchema, usuarioUpdateSchema } = require('../requests/UsuarioRequest');


routes.post('/', validate(usuarioStoreSchema), UsuarioController.store);


routes.use(authMiddleware);

routes.get('/', gate.authorize('manage-users'), UsuarioController.index);
routes.put('/:id', gate.authorize('manage-users'), validate(usuarioUpdateSchema), UsuarioController.update);
routes.delete('/:id', gate.authorize('manage-users'), UsuarioController.delete);

module.exports = routes;
