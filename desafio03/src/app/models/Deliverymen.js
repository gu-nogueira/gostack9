import Sequelize, { Model } from 'sequelize';

class Deliverymen extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      path: Sequelize.STRING,

    },
    {
      sequelize,
    });
    return this;
  };

  // Foreign key com tabela files
  static associate(models) {
    this.belongsTo(models.Files, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliverymen;
