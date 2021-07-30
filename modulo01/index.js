// Importando o express
const express = require('express');

// Instanciando para iniciar a aplicação, passa-se express() pois o express retorna uma function
const server = express();

// Este código é necessário para fazer com que o express interprete requisições json no corpo da requisição (POST, PUT), usando o '.use()' para adicionar um plugin / módulo para o express, passando como argumento 'express.json()'.
server.use(express.json());

// Query params para se passar na API = ?nome=Gustavo
// Route params para se passar na API = /teste/1
// Request body, conteúdo da requisição que vem por POST e PUT, NÃO PODE SER GET = { "name": "Gustavo", "email": "gus.h.nogueira@gmail.com" }

console.log('O servidor está rodando');

// Aquilo que manipulamos nas rotas na função que recebe req (requisição) e res (resposta) são chamados de MIDDLEWARES, que faz o processamento dos dados e retorna ou não alguma coisa para o usuário

// Isto é um MIDDLEWARE GLOBAL
// Nele, é necessário passar outro parametro alem do req e res: next

let counter = 1;

server.use((req, res, next) => {
  console.time(`Request ${counter}`);
  console.log(`Método: ${req.method}; URL: ${req.url}; `);

  // Isto é um middleware, ele INTERCEPTA as requisições
  // return next();
  // Com isso, ele não bloqueia o fluxo da nossa aplicaçaão. Podemos usar isso para satisfazer condições (if)
  next();

  // o '.timeEnd()' funciona somente se a mesma informação for passada no 'console.time'. Assim ele faz o cálculo de quanto tempo levou para executar aquele trecho de código.
  console.timeEnd(`Request ${counter}`);
  counter++;
})


// Essas são funções middlewares que serão passadas como parâmetro nas rotas para validar a requisição

function checkUserName(req, res, next) {
  // verifica se há algum valor dentro de req.body.name, caso retorne null ou undefined, atende a condição
  if (!req.body.name) {
    // Retorna com o '.status()' o código 400: Bad Request, com uma mensagem de erro em json
    return res.status(400).json({error : 'User name is required'})
  }

  return next();
}
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  // verifica não há nada dentro de user 
  if (!user) {
    return res.status(400).json({error : 'User does not exists'})
  }

  // Os middlewares conseguem alterar as variáveis req (principalmente) e res, neste caso estamos atribuindo user a req como um atributo de req
  req.user = user;

  return next();
}


// Método GET é o padrão HTTP quando acessamos alguma rota no navegador 
server.get('/teste/:id', (req, res) => {

  // .send() é a função que retorna um texto para a requisição;
  // .json() retorna um objeto em json, mas para isso é necessário o return antes da variável res

  // Pegar as informações por query params
  const nome = req.query.nome;

  // Pegar as informações por route params, importante observar que na requisição GET, foi necessário colocar o '/:id' no final da rota users, para assim receber o id por route param
  // const id = req.params.id
  // Forma de desestruturação simplificada, que procura o parametro id de dentro do req.params
  const { id } = req.params;

  return res.json({ message: `Vai tomar no cu de id ${id}`});
})

// Faremos o CRUD completo. CRUD = Create, Read, Update, Delete

const users = ['Gustavo', 'Nerso', 'Guilherme'];

// Rota para consulta de todos os usuários
server.get('/users', (req, res) => {
  return res.json(users);
})

// Rota para consulta de um único usuário
// Observação importante: na construção de uma nova rota, sempre colocar '/rota'
server.get('/users/:index', checkUserInArray, (req, res) => {
  // Observação: index não é uma palavra reservada para pegar posições do array, apenas uma boa prática de programação
  // const index = req.params.index;
  // return res.json(users[index]);

  // Todas as rotas que possuirem a função 'CheckUsersInArray' terão acesso a req.user
  return res.json(req.user);
})

// Enviar as informações por request body (Rota para inserção de um novo usuário)
server.post('/users', checkUserName, (req, res) => {
  // Aqui, enviaremos no corpo da requisição, portanto, não será .query, nem .params. E sim .body
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})

// Rota para edição de um usuário
server.put('/users/:index', checkUserName, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})

// Rota para exclusão de um usuário
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  // 200 é o statuscode 200OK, é possível enviar status code no .send
  return res.send(200);
})

// Define a porta que o serviddor será iniciado
server.listen(3000);