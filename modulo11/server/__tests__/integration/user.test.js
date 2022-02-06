import request from 'supertest';
import bcrypt from 'bcryptjs';

// Vamos importar também nossa aplicação
import app from '../../src/app';
// Aqui vai um ponto interessante de termos separado o app.js da inicialização do express em server.js
// Fizemos essa separação pois para testes não queremos inicializar um novo servidor do express com alguma porta no ar. Queremos pegar a instância do express direto do app.js
// E mesmo sem uma porta up no express o supertest vai conseguir fazer requisições no servidorr sem ter um endereço com uma porta acessível externamente

// AO invés de importarmos o model, importamos agora o factory
import factory from '../factories';
import truncate from '../utils/truncate';

// Utilizamos o describe em volta de todos os testes para categorizar os testes no momento de rodar o arquivo de teste.

describe('User', () => {
  // O Jest possui alguns métodos auxiliares que podemos utilizar, o 'beforeAll' é executado uma só vez antes de todos os testes. O 'beforeEach' é executado uma vez antes de cada teste. Também temos o 'afterAll' e o 'afterEach'
  beforeEach(async () => {
    await truncate();
  });

  // Este teste verificará se a senha do usuário criado é encriptografada e gerada um hash
  it('should encrypt user password when new user created', async () => {
    // Primeiro parametro de factory é o factory que será utilizado
    const user = await factory.create('User', {
      // Podemos definir ainda assim campos do usuário como a senha por exemplo dentro deste objeto, se não passarmos nada o campo é gerado aleatoriamente
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  // Ao inves de usarmos o test() vamos usar o it(), que tem o mesmo funcionamento, mas dá uma leitura melhor
  // Então por exemplo se esperamos que o teste registre um usuário de fato no banco, podemos escrever 'it shoud be able to register'
  it('should be able to register', async () => {
    // Se passarmos 'attrs' ao inves de 'create', o factory retornará um objeto com os atributos de user, mas não necessariamente irá criar no banco
    const user = await factory.attrs('User');

    // Vamos fazer uma requisição a API das rotas, poderiamos usar fetch, ou axios, mas vamos usar o 'supertest', que possui algumas coisas a mais para testes
    // Dentro de request não colocamos rota e sim o app
    const response = await request(app)
      // Depois colocamos o método que iremos utilizar com a url da rota
      .post('/users')
      // Dentro de .send() inserimos os dados para a criação do usuário
      .send(user);

    // Para verificarmos se o usuário foi criado dentro do banco de dados, precisamos pegar o conteúdo da requisição dentro de 'response.body', e podemos verificar se há um 'id' gerado pelo banco SQLite
    expect(response.body).toHaveProperty('id');
  });

  // Esse é um teste para tratativa de exceção, neste caso fazemos o cadastro do primeiro usuário, não precisando de resposta, depois tentamos cadastrar novamente para ver se o status esperado é 400 (pois não deve registrar emails duplicados)
  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
