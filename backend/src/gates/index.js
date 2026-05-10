const logger = require('../config/logger');


class Gate {
  constructor() {
    this.permissions = new Map();
  }

  
  define(action, callback) {
    this.permissions.set(action, callback);
  }

  
  allows(user, action, resource = null) {
    const callback = this.permissions.get(action);
    
    if (!callback) {
      logger.warn(`Gate: Regra não definida para a ação "${action}"`);
      return false;
    }

    return callback(user, resource);
  }

  
  authorize(action, getResource = null) {
    return (req, res, next) => {
      const user = { id: req.userId, cargo: req.userCargo }; 
      
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




gate.define('admin-only', (user) => user.cargo === 'admin');


gate.define('manage-users', (user) => user.cargo === 'admin');


gate.define('delete-product', (user) => user.cargo === 'admin');


gate.define('delete-fornecedor', (user) => user.cargo === 'admin');

module.exports = gate;
