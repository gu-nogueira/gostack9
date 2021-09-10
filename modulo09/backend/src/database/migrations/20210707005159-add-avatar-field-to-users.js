'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Neste caso não vamos dar .createTable(), mas sim somente .addColumn()
    await queryInterface.addColumn(
      // Parâmetros:
      // 1. Qual tabela vou adicionar uma coluna
      'users',
      // 2. Qual é o nome dessa coluna
      'avatar_id',
      {
        // Type será o ID da imagem, acho mais vantajoso utilizar file_id
        type: Sequelize.INTEGER,
        // References será a chave estrangeira, definimos que 'references' será referenciado pelo campo 'id' da tabela 'files'
        references: { model: 'files', key: 'id' },
        // CASCADE faz com que a alteração propague do 'id' de 'files' para 'avatar_id'
        onUpdate: 'CASCADE',
        // Define o campo 'avatar_id' do usuário como NULL caso o campo equivalente 'id' de 'files' seja deletado
        onDelete: 'SET NULL',
        allowNull: true,
      }
    )
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'avatar_id');
  }
};
