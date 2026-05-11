import { describe, it, expect, vi } from 'vitest';
import FornecedorService from '../FornecedorService.js';

describe('FornecedorService', () => {
  const mockModels = {
    Fornecedor: {
      findAll: vi.fn(),
      findOne: vi.fn(),
      create: vi.fn(),
      findByPk: vi.fn(),
      destroy: vi.fn(),
    }
  };

  const service = new FornecedorService(mockModels);

  it('deve listar todos os fornecedores', async () => {
    const lista = [{ id: 1, nome_fantasia: 'F1' }];
    mockModels.Fornecedor.findAll.mockResolvedValue(lista);

    const resultado = await service.listarTodos();
    expect(resultado).toEqual(lista);
  });

  it('deve criar um novo fornecedor', async () => {
    const dados = { nome_fantasia: 'F1', cnpj: '123' };
    mockModels.Fornecedor.findOne.mockResolvedValue(null);
    mockModels.Fornecedor.create.mockResolvedValue({ id: 1, ...dados });

    const resultado = await service.criar(dados);
    expect(resultado.id).toBe(1);
  });

  it('deve lançar erro se CNPJ já existir', async () => {
    mockModels.Fornecedor.findOne.mockResolvedValue({ id: 1 });
    await expect(service.criar({ cnpj: '123' })).rejects.toThrow('CNPJ já cadastrado.');
  });

  it('deve deletar um fornecedor', async () => {
    const fornecedorMock = { destroy: vi.fn().mockResolvedValue(true) };
    mockModels.Fornecedor.findByPk.mockResolvedValue(fornecedorMock);

    const resultado = await service.deletar(1);
    expect(fornecedorMock.destroy).toHaveBeenCalled();
    expect(resultado).toBe(true);
  });
});
