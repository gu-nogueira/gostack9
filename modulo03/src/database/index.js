// Aqui vamos conectar com o banco de dados e carregar os models
import Sequelize from 'sequelize';

// Importando TODOS os models da Aplicação
import Users from '../app/models/Users';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

// Importando as configurações do banco de dados
import databaseConfig from '../config/database';

// Criamos um array com todos os models da Aplicação
const models = [Users, File, Appointment];
class Database {
  constructor() {
    this.init();
  }

  // Este método init fará a conexão com o banco de dados e carregará os models
  init() {
    /** cria uma variável connection
    this atua de acordo com onde é referenciado, um objeto que recebe aquilo que lhe for passado, mas também tem valores padrões do prototype
    Passamos o databaseConfig como parâmetro do método Sequelize, passando as configurações do nosso banco de dados
    --------
    A partir de agora possuimos a nossa conexão na variável connection, que deverá ser passada como argumento dentro dos models no método estático 'init'
    */
    this.connection = new Sequelize(databaseConfig);

    /** Vamos percorrer o array models com .map, que espera como callback, onde 'model' se refere a 'Users', ou outros models que tenho na minha aplicação
    Agora vamos acessar o método init de cada classe de cada model, passando como argumento no método a variável 'connection'  */
    models
    .map(model => model.init(this.connection))
    // Vamos fazer um segundo map, percorrendo os models, chamando para cada um desses models models.associente. O && é o operador lógico 'AND', portanto, só irá executar model.associate caso haja o método associate dentro de model, no caso dentro de files não tem portanto não será executado
    .map(model => model.associate && model.associate(this.connection.models));
  }
}

// Mesma coisa que o module.exports
export default new Database();
