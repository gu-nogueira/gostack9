// bootstrap lida com dotenv
require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // Passamos ./ para pegar a raiz do projeto
  storage: './__tests__/database.sqlite',
  // logging exibe ou não as queries no console, por padrão vem 'true'
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
