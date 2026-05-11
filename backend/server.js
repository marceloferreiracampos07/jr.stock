require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const db = require('./models');
const errorMiddleware = require('./middlewares/error');

const app = express();

// Middlewares Iniciais
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

// Middleware de Erro (Sempre por último após as rotas)
app.use(errorMiddleware);

// Sincronização com o Banco e Inicialização do Servidor
const PORT = process.env.PORT || 3333;

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(` Servidor rodando na porta ${PORT}`);
    console.log(' Banco de dados sincronizado!');
  });
}).catch((err) => {
  console.error(' Erro ao conectar no banco de dados:', err);
});