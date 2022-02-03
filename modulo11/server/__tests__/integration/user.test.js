import request from 'supertest';

// Vamos importar também nossa aplicação
import app from '../../src/app';
// Aqui vai um ponto interessante de termos separado o app.js da inicialização do express em server.js
// Fizemos essa separação pois para testes não queremos inicializar um novo servidor do express com alguma porta no ar. Queremos pegar a instância do express direto do app.js
// E mesmo sem uma porta up no express o supertest vai conseguir fazer requisições no servidorr sem ter um endereço com uma porta acessível externamente

// Utilizamos o describe em volta de todos os testes para categorizar os testes no momento de rodar o comando test
describe('User', () => {
  // Ao inves de usarmos o test() vamos usar o it(), que tem o mesmo funcionamento, mas dá uma leitura melhor
  // Então por exemplo se esperamos que o teste registre um usuário de fato no banco, podemos escrever 'it shoud be able to register'
  it('should be able to register', async () => {
    // Vamos fazer uma requisição a API das rotas, poderiamos usar fetch, ou axios, mas vamos usar o 'supertest', que possui algumas coisas a mais para testes
    // Dentro de request não colocamos rota e sim o app
    const response = await request(app)
      // Depois colocamos o método que iremos utilizar com a url da rota
      .post('/users')
      // Dentro de .send() inserimos os dados para a criação do usuário
      .send({
        name: 'Gustavo Nogueira',
        email: 'gus.h.nogueira@gmail.com',
        password_hash: '123456',
      });

    // Para verificarmos se o usuário foi criado dentro do banco de dados, precisamos pegar o conteúdo da requisição dentro de 'response.body', e podemos verificar se há um 'id' gerado pelo banco SQLite
    expect(response.body).toHaveProperty('id');
  });
});
