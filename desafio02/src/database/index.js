import Sequelize from 'sequelize';

// Models
import Users from '../app/models/Users';
import Recipients from '../app/models/Recipients';

import databaseConfig from '../config/database';

// Array de models
const models = [Users, Recipients];

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
