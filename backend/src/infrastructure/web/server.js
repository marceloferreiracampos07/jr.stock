require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error');

const app = express();

// Segurança: Helmet para proteger headers HTTP
app.use(helmet());

// Segurança: Rate Limit para evitar ataques de força bruta/DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: {
    error: 'Muitas requisições vindas deste IP, tente novamente após 15 minutos.'
  }
});
app.use(limiter);

// Middlewares Iniciais
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

// Middleware de Erro
app.use(errorMiddleware);

module.exports = app;
