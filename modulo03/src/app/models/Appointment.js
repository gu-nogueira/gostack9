import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      date: Sequelize.DATE,
      canceled_at: Sequelize.DATE,
      past: {
        // Para definir o type de uma variável no objeto
        type: Sequelize.VIRTUAL,
        // Pelo método get podemos fazer qualquer coisa para retornar um valor aqui
        get () {
          // Vamos usar o método 'isBefore' do date-fns para checar se a data registrada no appointment no campo date está antes da data atual. Retorna true se sim e false se não
          return isBefore(this.date, new Date());
        },
      },
      cancelable: {
        type: Sequelize.VIRTUAL,
        get () {
          // Checa se agora (new Date ()) está antes da data do appointment, menos duas horas com 'subHours()', retorna true se sim e false se não
          return isBefore(new Date(), subHours(this.date, 2));
        }
      },
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

    // IMPORTANTE: precisamos usar apelidos nas chaves estrangeiras quando temos mais de um relacionamento se não o sequelize não entende (burro)

    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Users, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
