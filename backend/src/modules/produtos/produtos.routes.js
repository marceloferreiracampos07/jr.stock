const { Router } = require('express');
const routes = new Router();

const ProdutoController = require('./adapters/controllers/produtoscontroller');
const ProdutoService = require('./domain/use_cases/ProdutoService');
const SequelizeProdutoRepository = require('./adapters/repositories/SequelizeProdutoRepository');
const SequelizeMovimentacaoRepository = require('../movimentacoes/adapters/repositories/SequelizeMovimentacaoRepository');
const { Produto, Movimentacao } = require('../../infrastructure/database/models');

const authMiddleware = require('../../infrastructure/web/middlewares/auth');
const gate = require('../../infrastructure/security/gates');
const validate = require('../../infrastructure/web/middlewares/validation');
const { produtoSchema, registrarSaidaSchema } = require('./adapters/validations/ProdutoRequest');

// Injeção de Dependência
const produtoRepository = new SequelizeProdutoRepository(Produto);
const movimentacaoRepository = new SequelizeMovimentacaoRepository(Movimentacao);
const produtoService = new ProdutoService(produtoRepository, movimentacaoRepository);
const produtoController = new ProdutoController(produtoService);

routes.use(authMiddleware);

routes.get('/', (req, res) => produtoController.index(req, res));
routes.post('/', validate(produtoSchema), (req, res) => produtoController.store(req, res));
routes.put('/:id', validate(produtoSchema), (req, res) => produtoController.update(req, res));
routes.delete('/:id', gate.authorize('delete-product'), (req, res) => produtoController.delete(req, res));

// Rota específica para saída de estoque
routes.post('/:id/saida', validate(registrarSaidaSchema), (req, res) => produtoController.registerExit(req, res));

module.exports = routes;
