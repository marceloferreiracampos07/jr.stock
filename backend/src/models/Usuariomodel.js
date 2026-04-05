const {Model,Datatypes} = require('sequelize')
const sequelize= require('../config/database')
const bcrypt = require('bcryptjs');
class Usuario extends Model{
    checkPassword(password) {
    return bcrypt.compare(password, this.senha_hash);
  }
}


Usuario.init({
    nome:{
        type:Datatypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type:Datatypes.STRING,
        allowNull:false,
        unique:true,
        validate: { isEmail: true }

    },
    senha_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      len: [6, 20] // Mínimo 6 caracteres
    }
  },
  cargo: {
    type: DataTypes.STRING,
    defaultValue: 'vendedor'
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuarios',
  underscored: true,
  // HOOKS: Executam funções automaticamente antes de certas ações
  hooks: {
    beforeSave: async (usuario) => {
      if (usuario.senha) {
        // Transforma a senha em hash antes de salvar no banco
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    }
  },
  // ESCOPO: Protege a senha de ser listada em buscas comuns
  defaultScope: {
    attributes: { exclude: ['senha_hash'] }
  },
  scopes: {
    withPassword: { attributes: {}, }
  }
});

module.exports = Usuario;
