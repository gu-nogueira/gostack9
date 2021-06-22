// Model da tabela Users
import Sequelize, { Model } from 'sequelize';

// 'extends' define a classe 'User' como uma classe filha de 'Model'
class User extends Model {
  // Um método estático, não pode ser instanciado. Init será chamado automaticamente pelo sequelize
  static init(sequelize) {
    // Chamamos super, que é a classe pai 'Model'. Ou seja, chamamos init de Model
    super.init({
      /** No primeiro parâmetro deste método vamos enviar as colunas do banco de dados
      Podemos evitar enviar PK, FK, created_at e updated_at */
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,
    },
    /** No segundo parâmetro vamos retornar o 'sequelize' enviado como parâmtro no método init estático
    Podemos enviar mais parâmetros também, para alterar o nome da tabela, etc... */
    {
      sequelize,
    });
  };
}

// Aqui exportamos a classe User para utilizar em outros arquivos
export default User;
