// Model da tabela Users
import { Model } from 'sequelize';

// 'extends' define a classe 'User' como uma classe filha de 'Model'
class User extends Model {
  static init(sequelize) {
    super.init();
  };
}
