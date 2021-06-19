// Aqui devemos a sintaxe do commonJS, pois o sequelize-cli não interpreta nova sintaxe de 'import' e 'export'
module.exports = {
  // Define o tipo de banco de dados que irá trabalhar, porém também suporta MySQL, MariaDB, etc.
  dialect: 'postgres',
};
