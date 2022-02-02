// Utilizamos o describe em volta de todos os testes para categorizar os testes no momento de rodar o comando test
describe('User', () => {
  // Ao inves de usarmos o test() vamos usar o it(), que tem o mesmo funcionamento, mas dá uma leitura melhor
  // Então por exemplo se esperamos que o teste registre um usuário de fato no banco, podemos escrever 'it shoud be able to register'
  it('should be able to register', () => {
    // Vamos fazer uma requisição a API das rotas, poderiamos usar fetch, ou axios, mas vamos usar o 'supertest', que possui algumas coisas a mais para testes
  });
});
