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
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    // Usamos await pois isValid é assíncnrono. Deve retornar true se satisfazer as condições passadas acima no schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

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

    // Copiamos o trecho de código do schema, porém com algumas alterações
    // 'name' e 'email' não precisa mais ser required, pois o usuário pode não necessariamente estar editando o nome
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      // Aqui utilizamos .when(), uma validação condicional
      password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
        // Aqui é a mesmaa coisa que: if (oldPassowrd) { field.required() } else { field }
        oldPassword ? field.required() : field
        // Como não passamos chaves no corpo desta função, é o mesmo que ela estivesse retornando os valores
      ),
      /** Para fixar o uso de .when, vamos construir uma confirmação de senha
        * não é necessário usar .min pois já usamos no campo password */
      confirmPassword: Yup.string().when('password', (password, field) =>
        /** Verifica se há valor no password, se houver se torna required
         * oneOf() quer dizer que eu quero que meu campo field seja igual ao meu campo referenciado (Yup.ref(password))
         * Caso não satisfaça, somente retorna o field */
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

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

    // Passa todas as informações do corpo requisicao para atualizar no banco
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
