import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      date: Sequelize.DATE,
      canceled_at: Sequelize.DATE,
    },
    {
      sequelize,
    });
    return this;
  };

  // Criando os relacionamentos
  // Lembrando, este método associate será chamado automaticamente pelo loader de models em 'database > index.js'
  static associate(models) {
    // Esta tabela Appointment pertencerá (belongsTo) ao model de usuário, pois o usuário marcou este agendamento
    // Aponta user_id da tabela Appointments como sendo chave estrangeira com apelido (codinome) de 'user'

    // IMPORTANTE: precisamos usar apelidos nas chaves estrangeiras quando temos mais de um relacionamento se não o sequelize não entende

    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Users, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
