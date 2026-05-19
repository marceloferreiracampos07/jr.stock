const { Router } = require('express');
const routes = new Router();

const MovimentacaoController = require('./adapters/controllers/movimentacaocontroller');
const MovimentacaoService = require('./domain/use_cases/MovimentacaoService');
const SequelizeMovimentacaoRepository = require('./adapters/repositories/SequelizeMovimentacaoRepository');
const SequelizeProdutoRepository = require('../produtos/adapters/repositories/SequelizeProdutoRepository');
const { Movimentacao, Produto } = require('../../infrastructure/database/models');

const authMiddleware = require('../../infrastructure/web/middlewares/auth');
const validate = require('../../infrastructure/web/middlewares/validation');
const { movimentacaoSchema } = require('./adapters/validations/MovimentacaoRequest');

// Injeção de Dependência
const movimentacaoRepository = new SequelizeMovimentacaoRepository(Movimentacao);
const produtoRepository = new SequelizeProdutoRepository(Produto);
const movimentacaoService = new MovimentacaoService(movimentacaoRepository, produtoRepository);
const movimentacaoController = new MovimentacaoController(movimentacaoService);

routes.use(authMiddleware);

routes.get('/', (req, res) => movimentacaoController.index(req, res));
routes.post('/', validate(movimentacaoSchema), (req, res) => movimentacaoController.store(req, res));

module.exports = routes;
