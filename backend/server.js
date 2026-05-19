require('dotenv').config();
const app = require('./src/infrastructure/web/server');
const { sequelize } = require('./src/infrastructure/database/models');

const PORT = process.env.PORT || 3333;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('❌ Erro ao conectar ao banco de dados:', err);
});
