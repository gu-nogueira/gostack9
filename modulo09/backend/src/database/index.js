import Sequelize from 'sequelize';
import Mongoose from 'mongoose';

import Users from '../app/models/Users';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [Users, File, Appointment];

class Database {

  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
    .map(model => model.init(this.connection))
    .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = Mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }
    )
  }

}

export default new Database();
