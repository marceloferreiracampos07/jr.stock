import { describe, it, expect, vi } from 'vitest';
import ProdutoService from '../ProdutoService.js';

describe('ProdutoService', () => {
  const mockModels = {
    Produto: {
      create: vi.fn(),
      findAll: vi.fn(),
      findByPk: vi.fn(),
      destroy: vi.fn(),
      sequelize: {
        transaction: vi.fn().mockResolvedValue({
          commit: vi.fn(),
          rollback: vi.fn()
        })
      }
    },
    Fornecedor: {},
    Movimentacao: {
      create: vi.fn()
    }
  };

  const service = new ProdutoService(mockModels);

  it('deve criar um novo produto com sucesso', async () => {
    const dados = { nome: 'Produto', preco: 10, quantidade: 5, fornecedor_id: 1 };
    const criado = { id: 1, ...dados };
    mockModels.Produto.create.mockResolvedValue(criado);

    const resultado = await service.criar(dados);
    expect(resultado).toEqual(criado);
  });

  it('deve listar todos os produtos', async () => {
    const lista = [{ id: 1, nome: 'P1' }];
    mockModels.Produto.findAll.mockResolvedValue(lista);

    const resultado = await service.listarTodos();
    expect(resultado).toEqual(lista);
  });

  it('deve atualizar um produto', async () => {
    const updatedProduto = { id: 1, nome: 'Novo Nome' };
    const produtoMock = { 
      update: vi.fn().mockResolvedValue(updatedProduto)
    };
    mockModels.Produto.findByPk.mockResolvedValue(produtoMock);

    const resultado = await service.atualizar(1, { nome: 'Novo Nome' });
    expect(produtoMock.update).toHaveBeenCalled();
    expect(resultado).toEqual(updatedProduto);
  });

  it('deve deletar um produto com sucesso', async () => {
    mockModels.Produto.destroy.mockResolvedValue(1);

    const resultado = await service.deletar(1);
    expect(resultado).toBe(true);
  });

  it('deve registrar saida, atualizar saldo e criar movimentacao com sucesso', async () => {
    const produtoMock = { 
      id: 1, 
      quantidade: 10, 
      update: vi.fn().mockResolvedValue({ id: 1, quantidade: 5 }) 
    };
    mockModels.Produto.findByPk.mockResolvedValue(produtoMock);
    mockModels.Movimentacao = { create: vi.fn().mockResolvedValue({}) };
    // Re-instantiate to include mockModels.Movimentacao in the service's accessible scope if necessary, 
    // or just inject it into constructor
    const serviceWithMov = new ProdutoService({ ...mockModels, Movimentacao: mockModels.Movimentacao });

    const resultado = await serviceWithMov.registrarSaida(1, 5);
    
    expect(produtoMock.update).toHaveBeenCalledWith(
      { quantidade: 5 },
      expect.objectContaining({ transaction: expect.anything() })
    );
    expect(mockModels.Movimentacao.create).toHaveBeenCalledWith(
      {
        produto_id: 1,
        quantidade: 5,
        tipo: 'SAIDA'
      },
      expect.objectContaining({ transaction: expect.anything() })
    );
    expect(resultado.quantidade).toBe(5);
  });

  it('deve lançar erro de saldo insuficiente', async () => {
    const produtoMock = { id: 1, quantidade: 10 };
    mockModels.Produto.findByPk.mockResolvedValue(produtoMock);

    await expect(service.registrarSaida(1, 15)).rejects.toThrow('Saldo insuficiente');
  });
});
