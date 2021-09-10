// Model da tabela Users
import Sequelize, { Model } from 'sequelize';

// Importando o bcrypt para gerar a hash do password
import bcrypt from 'bcryptjs';

// 'extends' define a classe 'Users' como uma classe filha de 'Model'
class Users extends Model {
  // Um método estático, não pode ser instanciado. Init será chamado automaticamente pelo sequelize
  static init(sequelize) {
    // Chamamos super, que é a classe pai 'Model'. Ou seja, chamamos init de Model
    super.init({
      /** No primeiro parâmetro deste método vamos enviar as colunas da tabela Users do banco de dados
      Podemos evitar enviar PK, FK, created_at e updated_at

      Esses campos não precisam refletir aos campos que existem no banco de dados
      Eles são os campos que o usuário poderia preencher no front*/
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      // VIRTUAL, discrimina uma campo que nunca existirá na base de dados, existe somente no lado do código
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN,
    },
    /** No segundo parâmetro vamos retornar o 'sequelize' enviado como parâmtro no método init estático
    Podemos enviar mais parâmetros também, para alterar o nome da tabela, etc... */
    {
      sequelize,
    });

    // 'addHook' é uma funcionalidade do Sequelize, que é executado de forma automática baseada na ação passada como parâmetro na função
    this.addHook('beforeSave', async (user) => {
      // Isso se aplica a condição de que só irá gerar um novo password_hash se eu quero gerar ou alterar uma senha
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8); // '8' é o número de ROUNDS da criptografia, em um range de 0 a 100
      }
    });

    // Retorna o model que acabou de ser inicializado
    return this; // Não vejo a necessidade de usar isso, pois a classe retorna automaticamente o this caso não haja nenhum return

  };

  // associate() recebe todos os models da aplicação
  static associate(models) {
    // belongsTo é um tipo de relacionamento, entre vários outros
    // avatar_id pertence a models.file
    // Passamos -> as: 'avatar', que é um codinome para nosso relacionamento 'File'
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  /** Podemos criar métodos novos dentro da classe, de acordo com a necessidade da aplicação
  'compare()' faz uma comparação entre a senha que será passada por parâmetro na função (senha digitada pelo usuário) com a senha deste usuário que está cadastrado no banco */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash); // Dentro de 'this' tenho todas as informações do usuário
  }
}

// Aqui exportamos a classe Users para utilizar em outros arquivos
export default Users;
