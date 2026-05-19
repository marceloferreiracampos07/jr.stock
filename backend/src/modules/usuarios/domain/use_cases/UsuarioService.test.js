import { describe, it, expect, vi } from 'vitest';
import UsuarioService from '../UsuarioService.js';

describe('UsuarioService', () => {
  const mockModels = {
    Usuario: {
      findAll: vi.fn(),
      findOne: vi.fn(),
      create: vi.fn(),
      scope: vi.fn().mockReturnThis(),
      findByPk: vi.fn(),
      destroy: vi.fn(),
    }
  };

  const service = new UsuarioService(mockModels);

  it('deve listar todos os usuários', async () => {
    const lista = [{ id: 1, nome: 'User1' }];
    mockModels.Usuario.findAll.mockResolvedValue(lista);

    const resultado = await service.listarTodos();
    expect(resultado).toEqual(lista);
  });

  it('deve criar um usuário', async () => {
    const dados = { nome: 'U1', email: 'u1@test.com' };
    mockModels.Usuario.findOne.mockResolvedValue(null);
    mockModels.Usuario.create.mockResolvedValue({ id: 1, ...dados });

    const resultado = await service.criar(dados);
    expect(resultado.id).toBe(1);
  });
});
