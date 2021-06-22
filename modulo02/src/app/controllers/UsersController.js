// Vamos começar a importar os models que estão conectados com o banco, cada uma em seu respectivo controller
import Users from '../models/Users';

class UsersController {
  // Essa função terá a mesma face de um middleware, com req e res
  async store(req, res) {

    /** Aqui faço uma verificação antes de passar para o model o user da requisição
    Utilizando o método '.findOne()' para tentar encontrar o email passado na requisição no banco, se encontrar, retorno erro 400, bad request, com mensagem de erro */
    const userExists = await Users.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    /** O sequelize quando vai fazer uma operação no banco de dados, é um processo assíncrono, portanto devemos sempre utilizar async na função da operação await em qualquer operação do banco de dados pois não é em tempo real

    * Lembrando que requisição json vem no corpo da requisição, portanto, 'req.body'
    Até podemos pegar dado por dado de req.body, mas não é necessário pois dentro dos models já definimos os campos que serão utilizados */

    // Iremos passar para o FRONT-END somente alguns campos como resposta, não todos
    const { id, name, email, provider } = await Users.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
};

export default new UsersController ();

// Todo controller vai seguir esse formato
