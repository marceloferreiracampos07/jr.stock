require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');
const db = require('./models');
const errorMiddleware = require('./middlewares/error');

const app = express();

// Middlewares Iniciais
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

// Middleware de Erro
app.use(errorMiddleware);

// Exportar app para testes
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3333;
  db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(` Servidor rodando na porta ${PORT}`);
    });
  });
}