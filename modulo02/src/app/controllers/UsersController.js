// Vamos começar a importar os models que estão conectados com o banco, cada uma em seu respectivo controller
import Users from '../models/Users';

// Diferente de outros pacotes, o yup não possui um export default, portanto devemos criar uma variável para receber o conteúdo da biblioteca para
import * as Yup from 'yup';

class UsersController {
  // Essa função terá a mesma face de um middleware, com req e res
  async store(req, res) {

    // VALIDAÇÃO DE DADOS
    // O yup segue o 'schema validation' // '.object()' pois o 'req.body' é um objeto // '.shape()' é o formato do objeto
    const schema = Yup.object().shape({

    });

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

  // Método para atualização de usuário
  async update (req, res) {
    // Temos aqui o userId pois tratamos o token do usuário logado no middleware auth
    const { email, oldPassword } = req.body;

    const user = await Users.findByPk(req.userId);

    // Verifica se foi alterado o email
    if (email != user.email) {
      // Verifica se o email já está cadastrado no banco
      const userExists = await Users.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // Só fará a verificação se o usuário alterar a senha
    // & Verifica se a senha atual bate com a senha no banco
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    // Se todas as condições foram satisfeitas

    // Passa todas as informações do corpor requisicao para atualizar no banco
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
};

export default new UsersController ();
// Devemos instanciar a classe para utilizá-la
// Todo controller vai seguir esse formato
