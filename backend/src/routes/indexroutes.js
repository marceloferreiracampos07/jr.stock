const { Router } = require('express');
const routes = new Router();

// Importação dos Middlewares
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');
const validate = require('../middlewares/validation');

// Importação das Controllers
const UsuarioController = require('../controllers/Usuariocontroller');
const FornecedorController = require('../controllers/fornecedorController');
const ProdutoController = require('../controllers/produtoscontroller');
const MovimentacaoController = require('../controllers/movimentacaocontroller');
const SessionController = require('../controllers/SessionController'); // Para o Login

// Importação das Schemas de Validação
const { usuarioStoreSchema, usuarioUpdateSchema } = require('../requests/UsuarioRequest');
const { sessionStoreSchema } = require('../requests/SessionRequest');
const { fornecedorSchema } = require('../requests/FornecedorRequest');
const { produtoSchema } = require('../requests/ProdutoRequest');
const { movimentacaoSchema } = require('../requests/MovimentacaoRequest');

// --- ROTAS PÚBLICAS ---
routes.post('/login', validate(sessionStoreSchema), SessionController.store); // Login precisa ser aberto
routes.post('/usuarios', validate(usuarioStoreSchema), UsuarioController.store); // Cadastro inicial

// --- ROTAS PROTEGIDAS (Precisa de Token) ---
routes.use(authMiddleware); // Daqui para baixo, tudo exige login

// Rotas de Usuários
routes.get('/usuarios', UsuarioController.index);
routes.put('/usuarios/:id', validate(usuarioUpdateSchema), UsuarioController.update);

// Rotas de Fornecedores
routes.get('/fornecedores', FornecedorController.index);
routes.post('/fornecedores', validate(fornecedorSchema), FornecedorController.store);
routes.delete('/fornecedores/:id', adminMiddleware, FornecedorController.delete);

// Rotas de Produtos
routes.get('/produtos', ProdutoController.index);
routes.post('/produtos', validate(produtoSchema), ProdutoController.store);
routes.put('/produtos/:id', validate(produtoSchema), ProdutoController.update);

// Rotas de Movimentação (Estoque)
routes.get('/movimentacoes', MovimentacaoController.index);
routes.post('/movimentacoes', validate(movimentacaoSchema), MovimentacaoController.store);

module.exports = routes;