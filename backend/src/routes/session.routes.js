const { Router } = require('express');
const routes = new Router();

const SessionController = require('../controllers/SessionController');
const validate = require('../middlewares/validation');
const { sessionStoreSchema } = require('../requests/SessionRequest');

routes.post('/login', validate(sessionStoreSchema), SessionController.store);

module.exports = routes;
