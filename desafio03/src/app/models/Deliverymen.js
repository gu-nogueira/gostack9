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

<<<<<<< HEAD
  // Foreign key com tabela files
  static associate(models) {
    this.belongsTo(models.Files, { foreignKey: 'avatar_id', as: 'avatar' });
=======
  associate() {

>>>>>>> 5bf459bd3bef78b62dd01c554fc503978d0ce681
  }
}

export default Deliverymen;
