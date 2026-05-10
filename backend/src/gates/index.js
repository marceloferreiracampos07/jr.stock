const logger = require('../config/logger');

/**
 * Sistema de Gates para Autorização Granular
 */
class Gate {
  constructor() {
    this.permissions = new Map();
  }

  /**
   * Define uma nova regra de permissão
   * @param {string} action Nome da ação (ex: 'delete-product')
   * @param {function} callback Função que retorna true ou false
   */
  define(action, callback) {
    this.permissions.set(action, callback);
  }

  /**
   * Verifica se o usuário tem permissão para uma ação
   */
  allows(user, action, resource = null) {
    const callback = this.permissions.get(action);
    
    if (!callback) {
      logger.warn(`Gate: Regra não definida para a ação "${action}"`);
      return false;
    }

    return callback(user, resource);
  }

  /**
   * Middleware para usar diretamente nas rotas
   */
  authorize(action, getResource = null) {
    return (req, res, next) => {
      const user = { id: req.userId, cargo: req.userCargo }; // Assumindo que o authMiddleware preenche isso
      
      const resource = getResource ? getResource(req) : null;

      if (!this.allows(user, action, resource)) {
        return res.status(403).json({ 
          error: 'Acesso negado', 
          message: `Você não tem permissão para executar a ação: ${action}` 
        });
      }

      return next();
    };
  }
}

const gate = new Gate();

// --- DEFINIÇÃO DAS REGRAS ---

// Apenas administradores podem deletar qualquer coisa
gate.define('admin-only', (user) => user.cargo === 'admin');

// Apenas administradores podem gerenciar usuários
gate.define('manage-users', (user) => user.cargo === 'admin');

// Exemplo: Deletar produto (apenas admin)
gate.define('delete-product', (user) => user.cargo === 'admin');

// Exemplo: Deletar fornecedor (apenas admin)
gate.define('delete-fornecedor', (user) => user.cargo === 'admin');

module.exports = gate;
