import Sequelize from 'sequelize';

// Models


import databaseConfig from '../config/database';

// Array de models
const models = [];

class Database {
  constructor() {
    this.init();
  }
  init() {
    // Conexão com o banco
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}
