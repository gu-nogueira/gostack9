require('dotenv/config');
// Arquivo para definir a configuração do banco de dados

// Aqui devemos uasr a sintaxe do commonJS, pois o sequelize-cli não interpreta nova sintaxe de 'import' e 'export'
module.exports = {
  // Define o tipo de banco de dados que irá trabalhar. Também suporta MySQL, MariaDB, SQLite.
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    // Isso garante que haverá dois campos em todas as tabelas, identificando criação e alteração de registros: created at e updated at
    timestamps: true,
    // Isso garante a padronização de nomenclatura de tabelas e colunas, através do padrão underscored, e não camelcase
    underscored: true,
    underscoredAll: true,
  },
};
