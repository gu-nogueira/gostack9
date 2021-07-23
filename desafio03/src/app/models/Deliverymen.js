import Sequelize, { Model } from 'sequelize';

class Deliverymen extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
      }
    },
    {
      sequelize,
    });
    return this;
  };

  associate() {

  }
}

export default Deliverymen;
