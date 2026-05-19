require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error');

const app = express();

// Middlewares Iniciais
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

// Middleware de Erro
app.use(errorMiddleware);

module.exports = app;
