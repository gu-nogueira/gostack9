import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        // Definimos este método get, para como queremos formatar este valor
        get() {
          // Temos acesso a variável this do método init, portanto temos acesso a name e path
          return `${process.env.APP_URL}/files/${this.path}`;
        }
      },
    },
    {
      sequelize,
    });
    return this;
  };
}

export default File;
