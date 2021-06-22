// Aqui vamos conectar com o banco de dados e carregar os models
import Sequelize from 'sequelize';

// Importando TODOS os models da Aplicação
import Users from '../app/models/Users';

// Importando as configurações do banco de dados
import databaseConfig from '../config/database';

// Criamos um array com todos os models da Aplicação
const models = [Users];
class Database {
  /** Constructor é um método padrão para criar e inicializar um objeto criado a partir de uma classe
  É auto executável...? Chamará o init e será executado */
  constructor() {
    this.init();
  }

  // Este método init fará a conexão com o banco de dados e carregará os models
  init() {
    /** cria uma variável connection
    this atua de acordo com onde é referenciado, um objeto que recebe aquilo que lhe for passado, mas também tem valores padrões do prototype
    Passamos o databaseConfig como parâmetro do método Sequelize, passando as configurações do nosso banco de dados
    --------
    A partir de agora possuimos a nossa conexão na variável connection, que é a variável deverá ser passada como argumento dentro dos models no método estático 'init'
    */
    this.connection = new Sequelize(databaseConfig);

    /** Vamos percorrer o array models com .map, que espera como callback, onde 'model' se refere a 'Users', ou outros models que tenho na minha aplicação
    Agora vamos acessar o método init de cada classe de cada model, passando como argumento no método a variável 'connection'  */
    models.map(model => model.init(this.connection));
  }
}

// Mesma coisa que o module.exports
export default new Database();
