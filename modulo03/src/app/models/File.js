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
          return `http://localhost:2000/files/${this.path}`;
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
