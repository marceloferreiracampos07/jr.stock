import { describe, it, expect, vi } from 'vitest';
import gate from '../index.js';

describe('Gate Authorization', () => {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };

  const next = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Cenário de Sucesso: admin deve acessar rota admin-only', () => {
    const req = { userId: 1, userCargo: 'admin' };
    const middleware = gate.authorize('admin-only');
    
    middleware(req, res, next);
    
    expect(next).toHaveBeenCalled();
  });

  it('Cenário de Bloqueio: user comum deve ser negado (403)', () => {
    const req = { userId: 2, userCargo: 'user' };
    const middleware = gate.authorize('admin-only');
    
    middleware(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Acesso negado' }));
    expect(next).not.toHaveBeenCalled();
  });

  it('Cenário de Fronteira: cargo undefined deve ser negado', () => {
    const req = { userId: 3, userCargo: undefined };
    const middleware = gate.authorize('admin-only');
    
    middleware(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('Cenário de Regra Inexistente: ação não definida deve ser negada', () => {
    const req = { userId: 1, userCargo: 'admin' };
    const middleware = gate.authorize('non-existent-action');
    
    middleware(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
