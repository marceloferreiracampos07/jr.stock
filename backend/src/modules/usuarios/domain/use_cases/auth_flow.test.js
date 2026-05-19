import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
const app = require('../server'); 
const { Usuario } = require('../models');
const sequelize = require('../config/database');

describe('Fluxo de Autenticação e Usuários (Integração)', () => {
  beforeAll(async () => {
    // Sincroniza o banco de dados (usando uma tabela temporária ou um banco de testes seria melhor)
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/usuarios')
      .send({
        nome: 'Teste Integração',
        email: 'integracao@teste.com',
        senha: 'password123',
        cargo: 'vendedor'
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('integracao@teste.com');
  });

  it('deve logar com o usuário criado', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'integracao@teste.com',
        senha: 'password123'
      });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
