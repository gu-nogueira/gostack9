import Sequelize from 'sequelize';

// Models
import Users from '../app/models/Users';
import Recipients from '../app/models/Recipients';
import Files from '../app/models/Files';
import Deliverymen from '../app/models/Deliverymen';
import Deliveries from '../app/models/Deliveries';
import DeliveryProblems from '../app/models/DeliveryProblems';

import databaseConfig from '../config/database';

// Array de models
const models = [
  Users,
  Recipients,
  Files,
  Deliverymen,
  Deliveries,
  DeliveryProblems,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão postgreSQL
    this.connection = new Sequelize(databaseConfig);

    console.log('Loading models...');

    models
      .map((model) => model.init(this.connection))
      // map de associate() de models
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
