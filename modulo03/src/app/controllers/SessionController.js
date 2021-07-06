// Controller para autenticação JWT (JSON Web Token)

// A importação vai acima da de usuário pois é uma importação de módulo
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Users from '../models/Users';

import authConfig from '../../config/auth';
class SessionController {
  // Método store para criação da sessão
  async store(req, res) {

    // Fazemos a validação dos dados antes da tratativa com yup para o login também
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const { email, password } = req.body;
    /** Aqui vamos verificar se o usuário está tentando logar com um email existente
     * 'findOne()' pois quero apenas um registro de usuário, pois email é único
     *  Não é necessário passar "email: email" pois como o nome do atributo no objeto é o mesmo da variável, pode-se usar short syntax */
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    /** Verificação da senha
     *  Poderíamos importar o bcrypt aqui para fazer a verificação, mas podemos fazer um método dentro do model 'Users.js'
     *  o 'bcrypt.compare()' da função 'checkPassword()' é assíncrono, portanto temos que usar 'await' no 'if' para aguardá-lo terminar
     * O sinal de negação é pois caso o if de 'true' retornará a mensagem de erro */
    if (!await user.checkPassword(password)) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    // Pegamos agora o id e o nome do usuário
    const { id, name } = user;

    // Login foi um sucesso, portanto vamos retornar os dados do usuário
    return res.json({
      user: {
        id,
        name,
        email,
      },
      /** Vamos retornar mais uma variável, agora token, para gerar esse token vamos utilizar o método 'sign()' do jwt
       *  O primeiro parâmetro deste método: { id } é o payload (header), são informações adicionais, vamos passar o id para poder reutilizá-lo depois
       *  O segundo parâmetro será uma string (hash) único e ninguem pode ter acesso, portanto vamos gerar um no md5 online: guzango = 0e9250887fd461704fe299627cc3edd9
       *  O terceiro parâmetro serão passados algumas configurações: iremos definir primeiro uma data de expiração para esse token (padrão 7 dias) */
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController();
