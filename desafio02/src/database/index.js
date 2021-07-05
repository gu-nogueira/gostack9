import Sequelize from 'sequelize';

// Models
import Users from '../app/models/Users';

import databaseConfig from '../config/database';

// Array de models
const models = [Users];

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

export default new Database();
