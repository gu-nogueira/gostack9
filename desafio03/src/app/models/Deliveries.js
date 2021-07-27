import Sequelize, { Model } from 'sequelize';

class Deliveries extends Model {

  static init(sequelize) {
    super.init({
      product: Sequelize.STRING,
      canceled_at: Sequelize.DATE,
      start_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
    },
    {
      sequelize,
    });
    return this;
  };

  // Foreign keys
  static associate(models) {
    this.belongsTo(models.Files, { foreignKey: 'recipient_id', as: 'recipient' });
    this.belongsTo(models.Files, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
    this.belongsTo(models.Files, { foreignKey: 'signature_id', as: 'signature' });
  }

}

export default Deliveries;
