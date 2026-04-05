const { Router } = require('express');
const routes = new Router();

// Importação dos Middlewares
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

// Importação das Controllers
const UsuarioController = require('../controllers/Usuariocontroller');
const FornecedorController = require('../controllers/FornecedorController');
const ProdutoController = require('../controllers/produtoscontroller');
const MovimentacaoController = require('../controllers/movimentacaocontroller');
const SessionController = require('../controllers/SessionController'); // Para o Login

// --- ROTAS PÚBLICAS ---
routes.post('/login', SessionController.store); // Login precisa ser aberto
routes.post('/usuarios', UsuarioController.store); // Cadastro inicial

// --- ROTAS PROTEGIDAS (Precisa de Token) ---
routes.use(authMiddleware); // Daqui para baixo, tudo exige login

// Rotas de Usuários
routes.get('/usuarios', UsuarioController.index);
routes.put('/usuarios/:id', UsuarioController.update);

// Rotas de Fornecedores
routes.get('/fornecedores', FornecedorController.index);
routes.post('/fornecedores', FornecedorController.store);
routes.delete('/fornecedores/:id', adminMiddleware, FornecedorController.delete);

// Rotas de Produtos
routes.get('/produtos', ProdutoController.index);
routes.post('/produtos', ProdutoController.store);
routes.put('/produtos/:id', ProdutoController.update);

// Rotas de Movimentação (Estoque)
routes.get('/movimentacoes', MovimentacaoController.index);
routes.post('/movimentacoes', MovimentacaoController.store);

module.exports = routes;