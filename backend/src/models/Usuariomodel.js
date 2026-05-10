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
      len: [6, 20] 
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
  
  hooks: {
    beforeSave: async (usuario) => {
      if (usuario.senha) {
        
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    }
  },
  
  defaultScope: {
    attributes: { exclude: ['senha_hash'] }
  },
  scopes: {
    withPassword: { attributes: {}, }
  }
});

module.exports = Usuario;
