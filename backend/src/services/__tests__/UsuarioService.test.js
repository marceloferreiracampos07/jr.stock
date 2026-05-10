import { describe, it, expect, vi, beforeEach } from 'vitest';
const UsuarioService = require('../UsuarioService');
const { Usuario } = require('../../models');

// Mock do modelo Usuario para não tocar no banco de dados real
vi.mock('../../models', () => ({
  Usuario: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}));

describe('UsuarioService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve lançar um erro se o e-mail já estiver em uso', async () => {
    // Simulamos que o usuário já existe
    Usuario.findOne.mockResolvedValue({ id: 1, email: 'teste@teste.com' });

    const dadosNovoUsuario = {
      nome: 'Junior',
      email: 'teste@teste.com',
      senha: 'password123'
    };

    // O teste espera que a função lance um erro específico
    await expect(UsuarioService.criar(dadosNovoUsuario))
      .rejects.toThrow('Este e-mail já está em uso.');
  });

  it('deve criar um usuário com sucesso se o e-mail for único', async () => {
    // Simulamos que o e-mail não existe
    Usuario.findOne.mockResolvedValue(null);
    Usuario.create.mockResolvedValue({ id: 2, nome: 'Novo User', email: 'novo@teste.com' });

    const dados = { nome: 'Novo User', email: 'novo@teste.com', senha: 'password123' };
    const resultado = await UsuarioService.criar(dados);

    expect(resultado).toHaveProperty('id');
    expect(resultado.email).toBe('novo@teste.com');
    expect(Usuario.create).toHaveBeenCalledWith(dados);
  });
});
