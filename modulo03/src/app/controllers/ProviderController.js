// Apesar do provider também ser um usuário, vamos criar um controller para provider pois é outra ENTIDADE
// O UsersController consegue listar todos os usuários, mas no caso de eu querer listar somente os privers, crio um novo controller para isso

import Users from '../models/Users';
import File from '../models/File';

class ProviderController {
  async index(req, res) {

    // Passando SELECT * FROM USERS WHERE PROVIDER = true
    const providers = await Users.findAll({
      where: { provider: true },
      // Em attributes escolhemos os campos que quisermos para retornar
      attributes: ['id', 'name', 'email', 'avatar_id'],
      // Include é o INNER JOIN de tables, aqui estamos incluindo o model File, pois temos a chave estrangeira avatar_
      include: [{
        model: File,
        // Este é o nosso codinome criado no model 'Users'
        as: 'avatar',
        // Vamos retornar somente alguns campos do novo model relacionado 'File', assim como acima
        attributes: ['name', 'path', 'url'],
      }],
    });

    return res.json(providers);
  }
}

export default new ProviderController ();
