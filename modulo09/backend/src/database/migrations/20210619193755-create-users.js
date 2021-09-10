'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Aqui irão comandos de criação / alteração
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Não podemos ter emails repetidos
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  // No método down não vamos utilizar o parâmetro sequelize
  down: async (queryInterface) => {
     /**
     * Aqui irão comandos de rollback
     */
     await queryInterface.dropTable('users');
  }
};
